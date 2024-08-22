import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { ProgramScreenCommon } from '../../../../common/program-screen-common';

@Component({
  selector: 'app-master-plan',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent],
  templateUrl: './master-pan.component.html',
  styleUrl: './master-pan.component.scss'
})
export class MasterPanComponent extends ProgramScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  stereoPanChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 24, +(event.target as HTMLInputElement).value);
  }

  panModulationInput1TypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 76, +modulationType);
  }

  panModulationInput1AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 89, +(event.target as HTMLInputElement).value);
  }

  panModulationInput2TypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 77, +modulationType);
  }

  panModulationInput2AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 90, +(event.target as HTMLInputElement).value);
  }

  panModulationInput3TypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 78, +modulationType);
  }

  panModulationInput3AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 91, +(event.target as HTMLInputElement).value);
  }
}
