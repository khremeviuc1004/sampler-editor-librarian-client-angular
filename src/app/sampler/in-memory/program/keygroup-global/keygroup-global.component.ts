import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-keygroup-global',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './keygroup-global.component.html',
  styleUrl: './keygroup-global.component.scss'
})
export class KeygroupGlobalComponent extends ProgramScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  pitchModulationInputTypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 87, +modulationType);
  }

  filter1FreqModulationInput1TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 84, +modulationType);
  }

  filter2FreqModulationInput1TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 99, +modulationType);
  }

  loudnessModulationInputTypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 88, +modulationType);
  }

  filter1FreqModulationInput2TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 85, +modulationType);
  }

  filter2FreqModulationInput2TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 100, +modulationType);
  }

  filter1FreqModulationInput3TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 86, +modulationType);
  }

  filter2FreqModulationInput3TypeChanged(modulationType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 101, +modulationType);

  }
}
