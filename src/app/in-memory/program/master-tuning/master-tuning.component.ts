import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProgramScreenCommon } from '../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-master-tuning',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './master-tuning.component.html',
  styleUrl: './master-tuning.component.scss'
})
export class MasterTuningComponent extends ProgramScreenCommon implements OnInit {

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  tuneAmountChanged(event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 65, +(event.target as HTMLInputElement).value);
  }
}
