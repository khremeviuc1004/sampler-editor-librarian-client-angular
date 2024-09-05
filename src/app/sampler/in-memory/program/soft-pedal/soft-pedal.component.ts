import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-soft-pedal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatGridListModule, MatCardModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './soft-pedal.component.html',
  styleUrl: './soft-pedal.component.scss'
})
export class SoftPedalComponent extends ProgramScreenCommon implements OnInit {

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  loudnessReductionChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 62, +(event.target as HTMLInputElement).value);
  }

  attackStretchChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 63, +(event.target as HTMLInputElement).value);
  }

  filterCloseChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 64, +(event.target as HTMLInputElement).value);
  }
}
