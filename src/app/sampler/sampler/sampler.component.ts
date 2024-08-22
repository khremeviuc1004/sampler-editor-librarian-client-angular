import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { S1000MiscellaneousDataType, SamplerService } from '../../services/sampler.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScreenTitleComponent } from '../screen-title/screen-title.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { HardDrivePartitionLetterPipe } from '../../pipes/hard-drive-partition-letter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { diskAccessReadWrite as DiskAccessReadWrite } from '../../../util/util';

interface SamplerStatusRow {
  name: string;
  value: number,
}

interface HardDiskEntryDetailsType {
  index: number,
  name: string,
  type: string
}

interface VolumeListEntryDetailsType {
  index: number,
  name: string,
  active: boolean,
  type: string
}

@Component({
  selector: 'app-sampler',
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
    MatSelectModule
  ],
  templateUrl: './sampler.component.html',
  styleUrl: './sampler.component.scss'
})
export class SamplerComponent implements OnInit {

  @ViewChild('selectedProgramNumber') selectedProgramNumber?: ElementRef;
  @ViewChild('midiPlayCommandsOmniOverride') midiPlayCommandsOmniOverride?: MatCheckbox;
  @ViewChild('basicChannelOmni') basicChannelOmni?: MatCheckbox;
  @ViewChild('basicMidiChannel') basicMidiChannel?: ElementRef;
  @ViewChild('midiProgramSelectEnable') midiProgramSelectEnable?: MatCheckbox;
  @ViewChild('midiExlusiveChannel') midiExlusiveChannel?: ElementRef;
  @ViewChild('clearMemoryOnLoad') clearMemoryOnLoadCheckbox?: MatCheckbox;

  samplerStatusDisplayedColumns: string[] = ['name', 'value'];
  samplerResidentNamesDisplayedColumns: string[] = ['name', 'action'];
  hardDiskDirectoryDisplayedColumns: string[] = ['index', 'name', 'type'];
  volumeListDisplayedColumns: string[] = ['name', 'type'];
  partitionListDisplayedColumns: string[] = ['name'];

  diskAccessReadWrite = DiskAccessReadWrite;

  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerStatusReportDataSource = new MatTableDataSource<SamplerStatusRow>(new Array<SamplerStatusRow>());
  @ViewChild('statusPaginator')
  samplerStatusReportPaginator!: MatPaginator;
  samplerStatusDataLoading = true;

  samplerResidentSampleNamesDataSource = new MatTableDataSource<string>(new Array<string>());
  @ViewChild('residentSamplesPaginator')
  samplerResidentSampleNamesPaginator!: MatPaginator;
  samplerResidentSampleNamesLoading = true;

  samplerResidentProgramNamesDataSource = new MatTableDataSource<string>(new Array<string>());
  @ViewChild('residentProgramsPaginator')
  samplerResidentProgramNamesPaginator!: MatPaginator;
  samplerResidentProgramNamesLoading = true;

  samplerPartitionListDataSource = new MatTableDataSource<number>(new Array<number>());
  @ViewChild('samplerPartitionListPaginator')
  samplerPartitionListDataSourcePaginator!: MatPaginator;
  samplerPartitionListLoading = true;
  samplerPartitionListSelectIndex = 0;

  samplerVolumeListDataSource = new MatTableDataSource<VolumeListEntryDetailsType>(new Array<VolumeListEntryDetailsType>());
  @ViewChild('samplerVolumeListPaginator')
  samplerVolumeListDataSourcePaginator!: MatPaginator;
  samplerVolumeListLoading = true;
  samplerVolumeListSelectIndex = 0;

  samplerHardDiskEntriesDataSource = new MatTableDataSource<HardDiskEntryDetailsType>(new Array<HardDiskEntryDetailsType>());
  @ViewChild('residentHardDiskEntriesPaginator')
  samplerHardDiskEntriesDataSourcePaginator!: MatPaginator;
  samplerHardDiskEntriesLoading = true;

  s1000MiscellaneousData: S1000MiscellaneousDataType = {
    selectedProgramNumber: 0,
    midiPlayCommandsOmniOverride: false,
    basicChannelOmni: false,
    basicMidiChannel: 0,
    midiProgramSelectEnable: false,
    midiExlusiveChannel: 0
  }

  ngOnInit() : void {
    this.samplerResidentProgramNamesDataSource.filterPredicate = (data, filter) => {
      return data.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadResidentPrograms();
    this.samplerResidentSampleNamesDataSource.filterPredicate = (data, filter) => {
      return data.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadResidentSamples();
    this.samplerHardDiskEntriesDataSource.filterPredicate = (data, filter) => {
      return data.name.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadHardDiskDirectory();
    this.samplerStatusReportDataSource.filterPredicate = (data, filter) => {
      return data.name.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadStatusReport();
    this.samplerPartitionListDataSource.filterPredicate = (data, filter) => {
      return data.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadPartitionList();
    this.samplerVolumeListDataSource.filterPredicate = (data, filter) => {
      return data.name.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadVolumeList();

    // get the selected partition number
    this.samplerService.samplerHardDriveSelectedPartition().subscribe(selected_partition_number => this.samplerPartitionListSelectIndex = selected_partition_number);

    // get the selected volume list
    this.samplerService.samplerHardDrivePartitionSelectedVolume().subscribe(selected_volume_number => this.samplerVolumeListSelectIndex = selected_volume_number);

    this.samplerService.samplerRequestS1000MiscellaneousData().subscribe(s1000MiscellaneousData => {
      this.s1000MiscellaneousData = {
        selectedProgramNumber: s1000MiscellaneousData.selected_program_number,
        midiPlayCommandsOmniOverride: s1000MiscellaneousData.midi_play_commands_omni_override == 1,
        basicChannelOmni: s1000MiscellaneousData.basic_channel_omni == 1,
        basicMidiChannel: s1000MiscellaneousData.basic_midi_channel,
        midiProgramSelectEnable: s1000MiscellaneousData.midi_program_select_enable == 1,
        midiExlusiveChannel: s1000MiscellaneousData.midi_exlusive_channel
      };
    });
  }

  onStatusReportFilterInput(event: Event) {
    this.setStatusReportFilter((event.target as HTMLInputElement).value);
  }

  setStatusReportFilter(value: string) {
    this.samplerStatusReportDataSource.filter = value;
  }

  onProgramNameFilterInput(event: Event) {
    this.setProgramNameFilter((event.target as HTMLInputElement).value);
  }

  setProgramNameFilter(value: string) {
    this.samplerResidentProgramNamesDataSource.filter = value;
  }

  onSampleNameFilterInput(event: Event) {
    this.setSampleNameFilter((event.target as HTMLInputElement).value)
  }

  setSampleNameFilter(value: string) {
    this.samplerResidentSampleNamesDataSource.filter = value;
  }

  onHardDiskDirectoryFilterInput(event: Event) {
    this.setHardDiskDirectoryFilter((event.target as HTMLInputElement).value)
  }

  setHardDiskDirectoryFilter(value: string) {
    this.samplerHardDiskEntriesDataSource.filter = value;
  }

  onVolumeListFilterInput(event: Event) {
    this.setVolumeListFilter((event.target as HTMLInputElement).value)
  }

  setVolumeListFilter(value: string) {
    this.samplerVolumeListDataSource.filter = value;
  }

  onS1000MiscDataChange() {
    if (this.selectedProgramNumber && this.basicChannelOmni && this.basicMidiChannel && this.midiExlusiveChannel && this.midiPlayCommandsOmniOverride && this.midiProgramSelectEnable) {
      let newS1000MiscData: S1000MiscellaneousDataType = {
        selectedProgramNumber: +this.selectedProgramNumber.nativeElement.value - 1,
        midiPlayCommandsOmniOverride: this.midiPlayCommandsOmniOverride.checked,
        basicChannelOmni: this.basicChannelOmni.checked,
        basicMidiChannel: +this.basicMidiChannel.nativeElement.value - 1,
        midiProgramSelectEnable: this.midiProgramSelectEnable.checked,
        midiExlusiveChannel: +this.midiExlusiveChannel.nativeElement.value - 1
      }

      this.samplerService.samplerChangeS1000MiscellaneousData(newS1000MiscData);
    }
  }

  editProgram(programName: string) {
    console.log("Program row clicked: ", programName, this.samplerResidentProgramNamesDataSource.data.indexOf(programName));
    this.router.navigate(["in-memory-program", this.samplerResidentProgramNamesDataSource.data.indexOf(programName)]);
  }

  addProgram() {
    this.samplerService.samplerNewProgram(this.samplerResidentProgramNamesDataSource.data.length).subscribe(success => {
      if (success) {
        this.loadResidentPrograms();
      }
    });
  }

  deleteProgram(programName: string) {
    this.samplerService.samplerDeleteProgram(this.samplerResidentProgramNamesDataSource.data.indexOf(programName)).subscribe(success => {
      if (success) {
        this.loadResidentPrograms();
      }
    });
  }

  editSample(sampleName: string) {
    console.log("Sample row clicked: ", sampleName, this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName));
    this.router.navigate(["in-memory-sample", this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName)]);
  }

  deleteSample(sampleName: string) {
    this.samplerService.samplerDeleteSample(this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName)).subscribe(success => {
      if (success) {
        this.loadResidentSamples();
      }
    });
  }

  loadStatusReport() {
    this.samplerStatusDataLoading = true;
    this.samplerService.samplerStatusReport().subscribe(data => {
      let samplerStatusData = new Array<SamplerStatusRow>();
      let exclusiveChannel: SamplerStatusRow = {
        name: "exclusive channel",
        value: data["exclusive channel"]
      };
      samplerStatusData.push(exclusiveChannel);
      let freeBlocks: SamplerStatusRow = {
        name: "free blocks",
        value: data["free blocks"]
      };
      samplerStatusData.push(freeBlocks);
      let freeWords: SamplerStatusRow = {
        name: "free words",
        value: data["free words"]
      };
      samplerStatusData.push(freeWords);
      let maxBlocks: SamplerStatusRow = {
        name: "max blocks",
        value: data["max blocks"]
      };
      samplerStatusData.push(maxBlocks);
      let maxSampleWords: SamplerStatusRow = {
        name: "max sample words",
        value: data["max sample words"]
      };
      samplerStatusData.push(maxSampleWords);
      let softwareVersionMajor: SamplerStatusRow = {
        name: "software version major",
        value: data["software version major"]
      };
      samplerStatusData.push(softwareVersionMajor);
      let softwareVersionMinor: SamplerStatusRow = {
        name: "software version minor",
        value: data["software version minor"]
      };
      samplerStatusData.push(softwareVersionMinor);
      this.samplerStatusReportDataSource.data = samplerStatusData;
      this.samplerStatusReportDataSource.paginator = this.samplerStatusReportPaginator;
      this.samplerStatusDataLoading = false;
    });
  }

  loadResidentPrograms() {
    this.samplerResidentProgramNamesLoading = true;
    this.samplerService.samplerRequestResidentProgramNames().subscribe(data => {
      this.samplerResidentProgramNamesDataSource.data = data;
      this.samplerResidentProgramNamesDataSource.paginator = this.samplerResidentProgramNamesPaginator;
      this.samplerResidentProgramNamesLoading = false;
    });
  }

  loadResidentSamples() {
    this.samplerResidentSampleNamesLoading = true;
    this.samplerService.samplerRequestResidentSampleNames().subscribe(data => {
      this.samplerResidentSampleNamesDataSource.data = data;
      this.samplerResidentSampleNamesDataSource.paginator = this.samplerResidentSampleNamesPaginator;
      this.samplerResidentSampleNamesLoading = false;
    });
  }

  loadVolumeList(){
    this.samplerVolumeListLoading = true;
    this.samplerService.samplerRequestVolumeList().subscribe(volumeList => {
      let volumeListDetails = new Array<VolumeListEntryDetailsType>();
      volumeList.forEach(volumeEntry => {
        let volumeListDetailEntry: VolumeListEntryDetailsType = {
          index: volumeEntry.entry_number,
          name: volumeEntry.entry_name,
          active: volumeEntry.active,
          type: volumeEntry.type == 3 ? 'S3000' : 'S1000'
        };
        volumeListDetails.push(volumeListDetailEntry);
      })
      this.samplerVolumeListDataSource.data = volumeListDetails;
      this.samplerVolumeListDataSource.paginator = this.samplerVolumeListDataSourcePaginator;
      this.samplerVolumeListLoading = false;
    });
  }

  loadPartitionList(){
    this.samplerPartitionListLoading = true;
    this.samplerService.samplerHardDriveNumberOfPartitions().subscribe(numberOfPartitions => {
      let partitionListDetails = Array.from({length: numberOfPartitions}, (e, index) => index);
      this.samplerPartitionListDataSource.data = partitionListDetails;
      this.samplerPartitionListDataSource.paginator = this.samplerPartitionListDataSourcePaginator;
      this.samplerPartitionListLoading = false;
    });
  }

  loadHardDiskDirectory() {
    this.samplerHardDiskEntriesLoading = true;
    this.samplerService.samplerRequestHardDiskDirectory().subscribe(data => {
      let hardDiskEntries = new Array<HardDiskEntryDetailsType>();
      data.forEach(entry => {
        let tableEntry: HardDiskEntryDetailsType = {
          index: entry.entry_number,
          type: entry.type,
          name: entry.entry_name
        };
        hardDiskEntries.push(tableEntry);
      });
      this.samplerHardDiskEntriesDataSource.data = hardDiskEntries;
      this.samplerHardDiskEntriesDataSource.paginator = this.samplerHardDiskEntriesDataSourcePaginator;
      this.samplerHardDiskEntriesLoading = false;
    });
  }

  routeToConfigPage() {
    this.router.navigate(["config"]);
  }

  onVolumeSelectionIndexChange(index: number) {
    this.samplerVolumeListSelectIndex = index;
    console.log("Volume index selection changed to: ", index);
    this.samplerService.samplerSelectHardDriveVolume(index).subscribe(success => {
      if (success) {
        this.loadHardDiskDirectory();
      }
    })
  }

  onPartitionSelectionIndexChange(index: number) {
    this.samplerPartitionListSelectIndex = index;
    this.samplerVolumeListSelectIndex = 0;
    console.log("Partition index selection changed to: ", index);
    this.samplerService.samplerSelectHardDrivePartition(index).subscribe(success => {
      if (success) {
        // these need to be chained
        this.loadVolumeList();
        this.loadHardDiskDirectory();
      }
    })
  }

  onLoadVolume(loadType: number) {
    if (this.clearMemoryOnLoadCheckbox?.checked === true) {
      this.samplerService.samplerClearMemoryAndLoadFromSelectedVolume(loadType).subscribe(success => {
        if (success) {
          this.loadResidentPrograms();
          this.loadResidentSamples();
        }
      })
    }
    else {
      this.samplerService.samplerLoadFromSelectedVolume(loadType).subscribe(success => {
        if (success) {
          this.loadResidentPrograms();
          this.loadResidentSamples();
        }
      })
    }
  }
}
