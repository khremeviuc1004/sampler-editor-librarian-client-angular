import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-modes',
  standalone: true,
  imports: [MatFormFieldModule, MatCheckboxModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './modes.component.html',
  styleUrl: './modes.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModesComponent extends ProgramScreenCommon implements OnInit {

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  keyGroupCrossFadeChanged(checked: boolean): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 41, checked);
  }

  monoLegatoChanged(checked: boolean): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 72, checked);
  }
}
