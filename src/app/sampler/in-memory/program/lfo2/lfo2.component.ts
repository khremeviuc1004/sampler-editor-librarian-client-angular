import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { waveFormTypes as WaveFormTypes } from '../../../../../util/util';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';

@Component({
  selector: 'app-lfo2',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent],
  templateUrl: './lfo2.component.html',
  styleUrl: './lfo2.component.scss'
})
export class Lfo2Component extends ProgramScreenCommon implements OnInit {

  waveFormTypes = WaveFormTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  lfoWaveformChanged(waveform: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 98, +waveform);
  }

  lfoRetriggerChanged(checked: boolean): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 102, !checked);
  }

  lfoSpeedChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 29, +(event.target as HTMLInputElement).value);
  }

  lfoDepthChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 30, +(event.target as HTMLInputElement).value);
  }

  lfoDelayChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 31, +(event.target as HTMLInputElement).value);
  }

}
