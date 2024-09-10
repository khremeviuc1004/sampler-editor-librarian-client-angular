import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScreenTitleComponent } from '../screen-title/screen-title.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { HardDrivePartitionLetterPipe } from '../pipes/hard-drive-partition-letter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { diskAccessReadWrite as DiskAccessReadWrite } from '../../util/util';
import { MenuComponent } from '../menu/menu.component';
import { FileDetails, SamplerService } from '../services/sampler.service';

interface HardDiskEntryDetailsType {
  index: number;
  name: string;
  type: string;
}

interface VolumeListEntryDetailsType {
  index: number;
  name: string;
  active: boolean;
  type: string;
}

@Component({
  selector: 'app-disk',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    HardDrivePartitionLetterPipe,
    MatSelectModule,
    MenuComponent,
  ],
  templateUrl: './disk.component.html',
  styleUrl: './disk.component.scss',
})
export class DiskComponent implements OnInit {
  @ViewChild('clearMemoryOnLoad') clearMemoryOnLoadCheckbox?: MatCheckbox;
  @ViewChild('clearVolumeOnSave') clearVolumeOnSaveCheckbox?: MatCheckbox;
  @ViewChild('createNewVolumeOnSave') createNewVolumeOnSave?: MatCheckbox;

  samplerMemoryItemDisplayedColumns: string[] = ['name', 'file_type'];
  partitionListDisplayedColumns: string[] = ['name'];
  volumeListDisplayedColumns: string[] = ['name', 'type'];
  hardDiskDirectoryDisplayedColumns: string[] = ['index', 'name', 'type'];

  diskAccessReadWrite = DiskAccessReadWrite;

  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerMemoryItemDataSource = new MatTableDataSource<FileDetails>(
    new Array<FileDetails>(),
  );
  @ViewChild('memoryItemPaginator')
  samplerMemoryItemPaginator!: MatPaginator;
  samplerMemoryItemsLoading = true;
  samplerMemoryItemListSelectIndex = 0;

  samplerPartitionListDataSource = new MatTableDataSource<number>(
    new Array<number>(),
  );
  @ViewChild('samplerPartitionListPaginator')
  samplerPartitionListDataSourcePaginator!: MatPaginator;
  samplerPartitionListLoading = true;
  samplerPartitionListSelectIndex = 0;

  samplerVolumeListDataSource =
    new MatTableDataSource<VolumeListEntryDetailsType>(
      new Array<VolumeListEntryDetailsType>(),
    );
  @ViewChild('samplerVolumeListPaginator')
  samplerVolumeListDataSourcePaginator!: MatPaginator;
  samplerVolumeListLoading = true;
  samplerVolumeListSelectIndex = 0;

  samplerHardDiskEntriesDataSource =
    new MatTableDataSource<HardDiskEntryDetailsType>(
      new Array<HardDiskEntryDetailsType>(),
    );
  @ViewChild('residentHardDiskEntriesPaginator')
  samplerHardDiskEntriesDataSourcePaginator!: MatPaginator;
  samplerHardDiskEntriesLoading = true;

  selectedHarddiskVolumeEntryNumber = 0;
  selectedMemoryEntryNumber = 0;

  route: ActivatedRoute | null = null;
  openMode = true;

  constructor(route: ActivatedRoute) {
    this.route = route;
    console.log(
      'Disk screen path: ',
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path,
    );

    this.openMode =
      this.route.snapshot.url[this.route.snapshot.url.length - 1].path ===
      'disk-open';
  }

  ngOnInit(): void {
    if (!this.openMode) {
      this.samplerMemoryItemDataSource.filterPredicate = (data, filter) => {
        return (
          data
            .toString()
            .toLowerCase()
            .indexOf(filter.toString().toLowerCase()) != -1
        );
      };
      this.loadMemoryItems();
    }
    this.samplerPartitionListDataSource.filterPredicate = (data, filter) => {
      return (
        data
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadPartitionList();
    this.samplerVolumeListDataSource.filterPredicate = (data, filter) => {
      return (
        data.name
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadVolumeList();
    this.samplerHardDiskEntriesDataSource.filterPredicate = (data, filter) => {
      return (
        data.name
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadHardDiskDirectory();

    // get the selected partition number
    this.samplerService
      .samplerHardDriveSelectedPartition()
      .subscribe((selected_partition_number) => {
        this.samplerPartitionListSelectIndex = selected_partition_number;
        this.samplerHardDiskEntriesDataSourcePaginator.page.next({
          pageIndex:
            (selected_partition_number + 1) %
            this.samplerHardDiskEntriesDataSourcePaginator.pageSize,
          pageSize: this.samplerHardDiskEntriesDataSourcePaginator.pageSize,
          length: this.samplerHardDiskEntriesDataSourcePaginator.length,
        });
      });

    // get the selected volume list
    this.samplerService
      .samplerHardDrivePartitionSelectedVolume()
      .subscribe((selected_volume_number) => {
        this.samplerVolumeListSelectIndex = selected_volume_number;
        this.samplerHardDiskEntriesDataSourcePaginator.page.next({
          pageIndex:
            (selected_volume_number + 1) %
            this.samplerVolumeListDataSourcePaginator.pageSize,
          pageSize: this.samplerVolumeListDataSourcePaginator.pageSize,
          length: this.samplerVolumeListDataSourcePaginator.length,
        });
      });
  }

  onMemoryItemFilterInput(event: Event) {
    this.setMemoryItemFilter((event.target as HTMLInputElement).value);
  }

  setMemoryItemFilter(value: string) {
    this.samplerMemoryItemDataSource.filter = value;
  }

  onHardDiskDirectoryFilterInput(event: Event) {
    this.setHardDiskDirectoryFilter((event.target as HTMLInputElement).value);
  }

  setHardDiskDirectoryFilter(value: string) {
    this.samplerHardDiskEntriesDataSource.filter = value;
  }

  onVolumeListFilterInput(event: Event) {
    this.setVolumeListFilter((event.target as HTMLInputElement).value);
  }

  setVolumeListFilter(value: string) {
    this.samplerVolumeListDataSource.filter = value;
  }

  loadMemoryItems() {
    this.samplerMemoryItemsLoading = true;
    this.samplerService.samplerAllFilesInMemory().subscribe((data) => {
      this.samplerMemoryItemDataSource.data = data;
      this.samplerMemoryItemDataSource.paginator =
        this.samplerMemoryItemPaginator;
      this.samplerMemoryItemsLoading = false;
    });
  }

  onMemoryItemSelectionIndexChange(index: number) {
    this.samplerMemoryItemListSelectIndex = index;
    console.log('Memory item index selection changed to: ', index);
    this.samplerService
      .samplerUpdateMiscellaneousBytes(11, 2, index)
      .subscribe((success) =>
        console.log('Set the memory save selected item:', success),
      );
  }

  loadVolumeList() {
    this.samplerVolumeListLoading = true;
    this.samplerService.samplerRequestVolumeList().subscribe((volumeList) => {
      const volumeListDetails = new Array<VolumeListEntryDetailsType>();
      volumeList.forEach((volumeEntry) => {
        const volumeListDetailEntry: VolumeListEntryDetailsType = {
          index: volumeEntry.entry_number,
          name: volumeEntry.entry_name,
          active: true,
          type: volumeEntry.type == 3 ? 'S3000' : 'S1000',
        };
        volumeListDetails.push(volumeListDetailEntry);
      });
      this.samplerVolumeListDataSource.data = volumeListDetails;
      this.samplerVolumeListDataSource.paginator =
        this.samplerVolumeListDataSourcePaginator;
      // FIXME the following needs to be fixed
      this.samplerHardDiskEntriesDataSourcePaginator.page.next({
        pageIndex:
          (this.samplerVolumeListSelectIndex + 1) %
          this.samplerVolumeListDataSourcePaginator.pageSize,
        pageSize: this.samplerVolumeListDataSourcePaginator.pageSize,
        length: this.samplerVolumeListDataSourcePaginator.length,
      });
      this.samplerVolumeListLoading = false;
    });
  }

  loadPartitionList() {
    this.samplerPartitionListLoading = true;
    this.samplerService
      .samplerHardDriveNumberOfPartitions()
      .subscribe((numberOfPartitions) => {
        const partitionListDetails = Array.from(
          { length: numberOfPartitions },
          (e, index) => index,
        );
        this.samplerPartitionListDataSource.data = partitionListDetails;
        this.samplerPartitionListDataSource.paginator =
          this.samplerPartitionListDataSourcePaginator;
        this.samplerPartitionListLoading = false;
      });
  }

  loadHardDiskDirectory() {
    this.samplerHardDiskEntriesLoading = true;
    this.samplerService.samplerRequestHardDiskDirectory().subscribe((data) => {
      const hardDiskEntries = new Array<HardDiskEntryDetailsType>();
      data.forEach((entry, index) => {
        const tableEntry: HardDiskEntryDetailsType = {
          index: index,
          type: entry.type,
          name: entry.name,
        };
        hardDiskEntries.push(tableEntry);
      });
      this.samplerHardDiskEntriesDataSource.data = hardDiskEntries;
      this.samplerHardDiskEntriesDataSource.paginator =
        this.samplerHardDiskEntriesDataSourcePaginator;
      this.samplerHardDiskEntriesLoading = false;

      // now go get the selected entry
      this.samplerService
        .samplerGetMiscellaneousBytes(7, 2)
        .subscribe((value) => (this.selectedHarddiskVolumeEntryNumber = value));
    });
  }

  routeToConfigPage() {
    this.router.navigate(['config']);
  }

  onPartitionSelectionIndexChange(index: number) {
    this.samplerPartitionListSelectIndex = index;
    this.samplerVolumeListSelectIndex = 0;
    console.log('Partition index selection changed to: ', index);
    this.samplerService
      .samplerSelectHardDrivePartition(index)
      .subscribe((success) => {
        if (success) {
          // these need to be chained
          this.loadVolumeList();
          this.loadHardDiskDirectory();
        }
      });
  }

  onVolumeSelectionIndexChange(index: number) {
    this.samplerVolumeListSelectIndex = index;
    console.log('Volume index selection changed to: ', index);
    this.samplerService
      .samplerSelectHardDriveVolume(index)
      .subscribe((success) => {
        if (success) {
          this.loadHardDiskDirectory();
        }
      });
  }

  onHarddiskVolumeEntrySelectionIndexChange(index: number) {
    this.selectedHarddiskVolumeEntryNumber = index;
    this.samplerService
      .samplerUpdateMiscellaneousBytes(7, 2, index)
      .subscribe((success) =>
        console.log('samplerUpdateMiscellaneousBytes update', success),
      );
  }

  onLoadVolume(loadType: number) {
    if (this.clearMemoryOnLoadCheckbox?.checked === true) {
      this.samplerService
        .samplerClearMemoryAndLoadFromSelectedVolume(loadType)
        .subscribe((success) => {
          if (success) {
            // FIXME need to do something?
          }
        });
    } else {
      this.samplerService
        .samplerLoadFromSelectedVolume(loadType)
        .subscribe((success) => {
          if (success) {
            // FIXME need to do something?
          }
        });
    }
  }

  onSaveMemory(saveType: number) {
    if (this.createNewVolumeOnSave?.checked) {
      this.samplerService
        .samplerSaveMemoryToNewVolume(saveType)
        .subscribe((success) => {
          console.log("Saved memory to new volume:", success);

          // get the selected volume list
          this.samplerService
            .samplerHardDrivePartitionSelectedVolume()
            .subscribe((selected_volume_number) => {
              this.samplerVolumeListSelectIndex = selected_volume_number;
              this.samplerHardDiskEntriesDataSourcePaginator.page.next({
                pageIndex:
                  (selected_volume_number + 1) %
                  this.samplerVolumeListDataSourcePaginator.pageSize,
                pageSize: this.samplerVolumeListDataSourcePaginator.pageSize,
                length: this.samplerVolumeListDataSourcePaginator.length,
              });
            });
        });
    } else {
      if (this.clearVolumeOnSaveCheckbox?.checked) {
        this.samplerService
          .samplerClearVolumeAndSaveMemoryToSelectedVolume(saveType)
          .subscribe((success) => {
            if (success) {
              // FIXME need to do something?
            }
          });
      } else {
        this.samplerService
          .samplerSaveMemoryToSelectedVolume(saveType)
          .subscribe((success) => {
            if (success) {
              // FIXME need to do something?
            }
          });
      }
    }
  }
}
