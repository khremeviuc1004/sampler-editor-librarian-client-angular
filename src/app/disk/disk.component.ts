import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
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
import { FileDetails, HardDiskEntryDetailsType, NameOnly, SamplerService, VolumeListEntryDetailsType } from '../services/sampler.service';
import { ColumnDefinition, DataRetriever, SamplerTableComponent } from '../sampler-table/sampler-table.component';

class MemoryItemsDataRetriever extends DataRetriever<FileDetails> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerAllFilesInMemory()
      .subscribe(this.subscription);
    }
  }
}

class PartitionDataRetriever extends DataRetriever<NameOnly> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerHardDriveNumberOfPartitions()
      .subscribe(this.subscription);
    }
  }
}

class VolumeListDataRetriever extends DataRetriever<VolumeListEntryDetailsType> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerRequestVolumeList()
      .subscribe(this.subscription);
    }
  }
}

class VolumeContentsDataRetriever extends DataRetriever<HardDiskEntryDetailsType> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerRequestHardDiskDirectory()
      .subscribe(this.subscription);
    }
  }
}


@Component({
  selector: 'app-disk',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    HardDrivePartitionLetterPipe,
    MatSelectModule,
    MenuComponent,
    SamplerTableComponent
  ],
  templateUrl: './disk.component.html',
  styleUrl: './disk.component.scss',
})
export class DiskComponent implements OnInit {
  @ViewChild('clearMemoryOnLoad') clearMemoryOnLoadCheckbox?: MatCheckbox;
  @ViewChild('clearVolumeOnSave') clearVolumeOnSaveCheckbox?: MatCheckbox;
  @ViewChild('createNewVolumeOnSave') createNewVolumeOnSave?: MatCheckbox;

  diskAccessReadWrite = DiskAccessReadWrite;

  samplerService = inject(SamplerService);
  router = inject(Router);

  route: ActivatedRoute | null = null;
  openMode = true;

  @ViewChild('memoryItemsTable')
  memoryItemsTable!: SamplerTableComponent<FileDetails>;
  memoryItemsDataRetriever = new MemoryItemsDataRetriever(this.samplerService);
  memoryItemsColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
    {
      columnDefinitionName: 'file_type',
      displayName: 'Type'
    },
  ];

  @ViewChild('partitionsTable')
  partitionTable!: SamplerTableComponent<NameOnly>;
  partitionDataRetriever = new PartitionDataRetriever(this.samplerService);
  partitionColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
  ];

  @ViewChild('volumeListTable')
  volumeListTable!: SamplerTableComponent<NameOnly>;
  volumeListDataRetriever = new VolumeListDataRetriever(this.samplerService);
  volumeListColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
  ];

  @ViewChild('volumeContentsTable')
  volumeContentsTable!: SamplerTableComponent<NameOnly>;
  volumeContentsDataRetriever = new VolumeContentsDataRetriever(this.samplerService);
  volumeContentsColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
    {
      columnDefinitionName: 'type',
      displayName: 'Type'
    },
  ];

  nameFilterPredicate = (
    data: NameOnly,
    filter: string,
  ) => {
    if (data) {
      return (
        data
          .name
          .toLowerCase()
          .indexOf(filter.toLowerCase()) != -1
      );
    }

    return false;
  };



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
    // get the selected partition number
    this.samplerService
      .samplerHardDriveSelectedPartition()
      .subscribe((selected_partition_number) => {
        this.partitionTable.selectedRowNumber = selected_partition_number;
      });

    // get the selected volume list
    this.samplerService
      .samplerHardDrivePartitionSelectedVolume()
      .subscribe((selected_volume_number) => {
        this.volumeListTable.selectedRowNumber = selected_volume_number;
      });

    // get the selected volume entry
    this.samplerService
      .samplerGetMiscellaneousBytes(7, 2)
      .subscribe((selected_volume_entry_number) => {
        this.volumeContentsTable.selectedRowNumber = selected_volume_entry_number;
      });
  }

  onMemoryItemSelectionIndexChange(index: number) {
    console.log('Memory item index selection changed to: ', index);
    this.samplerService
      .samplerUpdateMiscellaneousBytes(11, 2, index)
      .subscribe((success) =>
        console.log('Set the memory save selected item:', success),
      );
  }

  onPartitionSelectionIndexChange(index: number) {
    this.volumeListTable.selectedRowNumber = 0;
    console.log('Partition index selection changed to: ', index);
    this.samplerService
      .samplerSelectHardDrivePartition(index)
      .subscribe((success) => {
        if (success) {
          this.volumeListTable.selectedRowNumber = 0;
          this.onVolumeSelectionIndexChange(0);
        }
      });
  }

  onVolumeSelectionIndexChange(index: number) {
    console.log('Volume index selection changed to: ', index);
    this.samplerService
      .samplerSelectHardDriveVolume(index)
      .subscribe((success) => {
        if (success) {
          this.onHarddiskVolumeEntrySelectionIndexChange(0, true);
        }
      });
  }

  onHarddiskVolumeEntrySelectionIndexChange(index: number, reload = false) {
    this.samplerService
      .samplerUpdateMiscellaneousBytes(7, 2, index)
      .subscribe((success) => {
        console.log('samplerUpdateMiscellaneousBytes update', success);
        if (success && reload) {
          this.volumeContentsTable.selectedRowNumber = index;
          this.volumeContentsTable.loadData();
        }
      });
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
              this.volumeListTable.selectedRowNumber = selected_volume_number;
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
