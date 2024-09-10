import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { bendModes as BendModes } from '../../../../util/util';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-pitch-bend',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './pitch-bend.component.html',
  styleUrl: './pitch-bend.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PitchBendComponent extends ProgramScreenCommon implements OnInit {

  bendModes = BendModes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  bendModeChanged(bendMode: string): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 74, +bendMode);
  }

  bendupChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 39, +(event.target as HTMLInputElement).value);
  }

  bendDownChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 73, +(event.target as HTMLInputElement).value);
  }

  pressureChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 40, +(event.target as HTMLInputElement).value);
  }
}
