import { Component, OnInit } from '@angular/core';
import { ModulationSourceType } from 'sampler-editor-librarian-dto'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { individualOutputTypes as IndividualOutputTypes, modulationInputSourceTypes as ModulationTypes } from '../../../../util/util';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-master-output',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './master-output.component.html',
  styleUrl: './master-output.component.scss'
})
export class MasterOutputComponent extends ProgramScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;
  modulationSourceTypes = ModulationSourceType;
  individualOutputTypes = IndividualOutputTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  loudnessChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 25, +(event.target as HTMLInputElement).value);
  }

  loudnessModulationInput1AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 26, +(event.target as HTMLInputElement).value);
  }

  loudnessModulationInput2TypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 79, +modulationType);
  }

  loudnessModulationInput2AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 92, +(event.target as HTMLInputElement).value);
  }

  loudnessModulationInput3TypeChanged(modulationType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 80, +modulationType);
  }

  loudnessModulationInput3AmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 93, +(event.target as HTMLInputElement).value);
  }

  individualOutputChanged(individualOutputType: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 22, +individualOutputType);
  }

  individualLevelChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 70, +(event.target as HTMLInputElement).value);
  }

  stereoLevelChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 23, +(event.target as HTMLInputElement).value);
  }
}
