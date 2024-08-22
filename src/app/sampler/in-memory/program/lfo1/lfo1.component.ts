import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { waveFormTypes as WaveFormTypes, modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-lfo1',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule],
  templateUrl: './lfo1.component.html',
  styleUrl: './lfo1.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class Lfo1Component extends ProgramScreenCommon implements OnInit {


  waveFormTypes = WaveFormTypes;
  modulationTypes= ModulationTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  lfoWaveformChanged(waveform: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 97, +waveform);
  }

  lfoDesyncChanged(checked: boolean): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 59, checked);
  }

  lfoSpeedChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 33, +(event.target as HTMLInputElement).value);
  }

  lfoSpeedModulationTypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 81, +modulationType);
  }

  lfoSpeedModulationAmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 94, +(event.target as HTMLInputElement).value);
  }

  lfoDepthChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 34, +(event.target as HTMLInputElement).value);
  }

  lfoDepthModulationTypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 82, +modulationType);
  }

  lfoDepthModulationAmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 95, +(event.target as HTMLInputElement).value);
  }

  lfoDelayChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 35, +(event.target as HTMLInputElement).value);
  }

  lfoDelayModulationTypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 83, +modulationType);
  }

  lfoDelayModulationAmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 96, +(event.target as HTMLInputElement).value);
  }

  lfoExtraDepthModwheelChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 36, +(event.target as HTMLInputElement).value);
  }

  lfoExtraDepthPressureChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 37, +(event.target as HTMLInputElement).value);
  }

  lfoExtraDepthVelocityChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 38, +(event.target as HTMLInputElement).value);
  }
}
