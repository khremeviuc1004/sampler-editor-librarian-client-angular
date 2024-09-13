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
import { ACTION, ColumnDefinition, DataRetriever, SamplerTableComponent, WHOLE } from '../sampler-table/sampler-table.component';

class ProgramDataRetriever extends DataRetriever<ProgramDetails> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerRequestResidentProgramNamesWithMidiProgramNumbers()
      .subscribe(this.subscription);
    }
  }
}

class SampleDataRetriever extends DataRetriever<string> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerRequestResidentSampleNames()
      .subscribe(this.subscription);
    }
  }
}

@Component({
  selector: 'app-sampler',
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
    HardDrivePartitionLetterPipe,
    MatSelectModule,
    MenuComponent,
    SamplerTableComponent
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

  samplerService = inject(SamplerService);
  router = inject(Router);

  nameFilterPredicate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    filter: string,
  ) => {
    if (data.name) {
      return (
        data['name']
          .toLowerCase()
          .indexOf(filter.toLowerCase()) != -1
      );
    }

    return false;
  };

  s1000MiscellaneousData: S1000MiscellaneousDataType = {
    selectedProgramNumber: 0,
    midiPlayCommandsOmniOverride: false,
    basicChannelOmni: false,
    basicMidiChannel: 0,
    midiProgramSelectEnable: false,
    midiExlusiveChannel: 0,
  };

  basicChannelValues = Array.from({length: 18}, (v, i) => i);

  programsDataRetriever = new ProgramDataRetriever(this.samplerService);
  programColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'midi_program_number',
      displayName: '#',
      formatDisplayText: (value) => {
        if (typeof(value) === 'number') {
          return '' + (value + 1);
        }
        return '' + value;
      }
    },
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
    {
      columnDefinitionName: 'xaction',
      type: ACTION,
      displayName: 'Actions'
    },
  ];
  @ViewChild('programsTable')
  programsTable!: SamplerTableComponent<ProgramDetails>;
  programRowSelectionDeterminer = (programDetails: ProgramDetails, rowIndex: number, selectedRowNumber: number)=> {
    return selectedRowNumber === programDetails.midi_program_number;
  }


  samplesDataRetriever = new SampleDataRetriever(this.samplerService);
  sampleColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      type: WHOLE,
      displayName: 'Name'
    },
    {
      columnDefinitionName: 'xaction',
      type: ACTION,
      displayName: 'Actions'
    },
  ];
  @ViewChild('samplesTable')
  samplesTable!: SamplerTableComponent<string>;

  ngOnInit(): void {
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
        this.programsTable.selectedRowNumber = s1000MiscellaneousData.selected_program_number;
      });
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
      .subscribe((success) => {
        console.log('Updated  selected program number: ', success);
        this.programsTable.selectedRowNumber = programNumber;
      });
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

  addProgram(newProgramIndex: number) {
    this.samplerService
      .samplerNewProgram(newProgramIndex)
      .subscribe((success) => {
        if (success) {
          this.programsTable.loadData()
        }
      });
  }

  deleteProgram(programNumber: number) {
    this.samplerService
      .samplerDeleteProgram(programNumber)
      .subscribe((success) => {
        if (success) {
          this.programsTable.loadData()
        }
      });
  }

  editSample(sampleNumber: number) {
    console.log(
      'Sample row clicked: ',
      sampleNumber,
      sampleNumber,
    );
    this.router.navigate([
      'in-memory-sample',
      sampleNumber,
    ]);
  }

  deleteSample(sampleNumber: number) {
    this.samplerService
      .samplerDeleteSample(
        sampleNumber,
      )
      .subscribe((success) => {
        if (success) {
          this.samplesTable.loadData();
        }
      });
  }
}
