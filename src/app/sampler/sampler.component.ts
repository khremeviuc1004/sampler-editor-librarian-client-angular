import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  ProgramDetails,
  S1000MiscellaneousDataType,
  SamplerService,
} from '../services/sampler.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScreenTitleComponent } from '../screen-title/screen-title.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { HardDrivePartitionLetterPipe } from '../pipes/hard-drive-partition-letter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../menu/menu.component';

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
    HardDrivePartitionLetterPipe,
    MatSelectModule,
    MenuComponent,
  ],
  templateUrl: './sampler.component.html',
  styleUrl: './sampler.component.scss',
})
export class SamplerComponent implements OnInit {
  @ViewChild('selectedProgramNumber') selectedProgramNumber?: ElementRef;
  @ViewChild('midiPlayCommandsOmniOverride')
  midiPlayCommandsOmniOverride?: MatCheckbox;
  @ViewChild('basicChannelOmni') basicChannelOmni?: MatCheckbox;
  @ViewChild('basicMidiChannel') basicMidiChannel?: ElementRef;
  @ViewChild('midiProgramSelectEnable') midiProgramSelectEnable?: MatCheckbox;
  @ViewChild('midiExlusiveChannel') midiExlusiveChannel?: ElementRef;

  samplerStatusDisplayedColumns: string[] = ['name', 'value'];
  samplerResidentProgramsDisplayedColumns: string[] = [
    'program_number',
    'name',
    'action',
  ];
  samplerResidentNamesDisplayedColumns: string[] = ['name', 'action'];
  hardDiskDirectoryDisplayedColumns: string[] = ['index', 'name', 'type'];
  volumeListDisplayedColumns: string[] = ['name', 'type'];
  partitionListDisplayedColumns: string[] = ['name'];

  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerResidentSampleNamesDataSource = new MatTableDataSource<string>(
    new Array<string>(),
  );
  @ViewChild('residentSamplesPaginator')
  samplerResidentSampleNamesPaginator!: MatPaginator;
  samplerResidentSampleNamesLoading = true;

  samplerResidentProgramNamesDataSource =
    new MatTableDataSource<ProgramDetails>(new Array<ProgramDetails>());
  @ViewChild('residentProgramsPaginator')
  samplerResidentProgramNamesPaginator!: MatPaginator;
  samplerResidentProgramNamesLoading = true;

  s1000MiscellaneousData: S1000MiscellaneousDataType = {
    selectedProgramNumber: 0,
    midiPlayCommandsOmniOverride: false,
    basicChannelOmni: false,
    basicMidiChannel: 0,
    midiProgramSelectEnable: false,
    midiExlusiveChannel: 0,
  };

  basicChannelValues = Array.from({length: 18}, (v, i) => i);

  ngOnInit(): void {
    this.samplerResidentProgramNamesDataSource.filterPredicate = (
      data,
      filter,
    ) => {
      return (
        data
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadResidentPrograms();

    this.samplerResidentSampleNamesDataSource.filterPredicate = (
      data,
      filter,
    ) => {
      return (
        data
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadResidentSamples();

    this.samplerService
      .samplerRequestS1000MiscellaneousData()
      .subscribe((s1000MiscellaneousData) => {
        this.s1000MiscellaneousData = {
          selectedProgramNumber: s1000MiscellaneousData.selected_program_number,
          midiPlayCommandsOmniOverride:
            s1000MiscellaneousData.midi_play_commands_omni_override == 1,
          basicChannelOmni: s1000MiscellaneousData.basic_channel_omni == 1,
          basicMidiChannel: s1000MiscellaneousData.basic_midi_channel,
          midiProgramSelectEnable:
            s1000MiscellaneousData.midi_program_select_enable == 1,
          midiExlusiveChannel: s1000MiscellaneousData.midi_exlusive_channel,
        };
      });
  }

  onProgramNameFilterInput(event: Event) {
    this.setProgramNameFilter((event.target as HTMLInputElement).value);
  }

  setProgramNameFilter(value: string) {
    this.samplerResidentProgramNamesDataSource.filter = value;
  }

  onSampleNameFilterInput(event: Event) {
    this.setSampleNameFilter((event.target as HTMLInputElement).value);
  }

  setSampleNameFilter(value: string) {
    this.samplerResidentSampleNamesDataSource.filter = value;
  }

  onS1000MiscDataChange() {
    if (
      this.selectedProgramNumber &&
      this.basicChannelOmni &&
      this.basicMidiChannel &&
      this.midiExlusiveChannel &&
      this.midiPlayCommandsOmniOverride &&
      this.midiProgramSelectEnable
    ) {
      const newS1000MiscData: S1000MiscellaneousDataType = {
        selectedProgramNumber:
          +this.selectedProgramNumber.nativeElement.value - 1,
        midiPlayCommandsOmniOverride: this.midiPlayCommandsOmniOverride.checked,
        basicChannelOmni: this.basicChannelOmni.checked,
        basicMidiChannel: +this.basicMidiChannel.nativeElement.value - 1,
        midiProgramSelectEnable: this.midiProgramSelectEnable.checked,
        midiExlusiveChannel: +this.midiExlusiveChannel.nativeElement.value - 1,
      };

      this.samplerService.samplerChangeS1000MiscellaneousData(newS1000MiscData);
    }
  }

  onSelectedProgramNumberChange(programNumber: number) {
    this.samplerService
      .samplerUpdateMiscellaneousBytes(55, 1, programNumber)
      .subscribe((success) =>
        console.log('Updated  selected program number: ', success),
      );
  }

  onSamplerBasicMidiChannelChange(item: number) {
    this.samplerService
      .samplerUpdateMiscellaneousBytes(71, 1, item)
      .subscribe((success) =>
        console.log('Updated  Sampler Basic Midi Channel: ', success),
      );
  }

  onSamplerMidiExclusiveChannelChange(programNumber: number) {
    this.samplerService
      .samplerUpdateMiscellaneousBytes(56, 1, programNumber)
      .subscribe((success) =>
        console.log('Updated  selected program number: ', success),
      );
  }

  onSamplerMidiPlayOmniOverrideChange(state: boolean) {
    this.samplerService
      .samplerUpdateMiscellaneousBytes(37, 1, state ? 1 : 0)
      .subscribe((success) =>
        console.log('Updated  Sampler Midi Play Omni override: ', success),
      );
  }

  editProgram(programNumber: number) {
    console.log('Program row clicked: ', programNumber);
    this.router.navigate(['in-memory-program', programNumber]);
  }

  addProgram() {
    this.samplerService
      .samplerNewProgram(this.samplerResidentProgramNamesDataSource.data.length)
      .subscribe((success) => {
        if (success) {
          this.loadResidentPrograms();
        }
      });
  }

  deleteProgram(programNumber: number) {
    this.samplerService
      .samplerDeleteProgram(programNumber)
      .subscribe((success) => {
        if (success) {
          this.loadResidentPrograms();
        }
      });
  }

  editSample(sampleName: string) {
    console.log(
      'Sample row clicked: ',
      sampleName,
      this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName),
    );
    this.router.navigate([
      'in-memory-sample',
      this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName),
    ]);
  }

  deleteSample(sampleName: string) {
    this.samplerService
      .samplerDeleteSample(
        this.samplerResidentSampleNamesDataSource.data.indexOf(sampleName),
      )
      .subscribe((success) => {
        if (success) {
          this.loadResidentSamples();
        }
      });
  }

  loadResidentPrograms() {
    this.samplerResidentProgramNamesLoading = true;
    this.samplerService
      .samplerRequestResidentProgramNamesWithMidiProgramNumbers()
      .subscribe((data) => {
        this.samplerResidentProgramNamesDataSource.data = data;
        this.samplerResidentProgramNamesDataSource.paginator =
          this.samplerResidentProgramNamesPaginator;
        this.samplerResidentProgramNamesLoading = false;
      });
  }

  loadResidentSamples() {
    this.samplerResidentSampleNamesLoading = true;
    this.samplerService
      .samplerRequestResidentSampleNames()
      .subscribe((data) => {
        this.samplerResidentSampleNamesDataSource.data = data;
        this.samplerResidentSampleNamesDataSource.paginator =
          this.samplerResidentSampleNamesPaginator;
        this.samplerResidentSampleNamesLoading = false;
      });
  }
}
