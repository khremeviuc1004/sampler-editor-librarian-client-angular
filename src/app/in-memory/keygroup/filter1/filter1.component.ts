import { Component, OnInit } from '@angular/core';
import { KeygroupScreenCommon } from '../../../common/keygroup-screen-common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { modulationInputSourceTypes as ModulationTypes } from '../../../../util/util';
import { MatSelectModule } from '@angular/material/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-filter1',
  standalone: true,
  imports: [
    MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule,
    ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent,
    NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,
  ],
  templateUrl: './filter1.component.html',
  styleUrl: './filter1.component.scss'
})
export class Filter1Component extends KeygroupScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;
  keyGroups = Array.from({length: this.programHeader ? this.programHeader.numberOfKeyGroups: 0}, (_, index) => index);

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }

  override doExtraStuff(): void {
    console.log(this.programHeader?.numberOfKeyGroups);
    this.keyGroups = Array.from({length: this.programHeader ? this.programHeader.numberOfKeyGroups: 0}, (_, index) => index);
    console.log(this.keyGroups);
  }

  onKeygroupChange(keygroupNumber: string) {
    console.log("keygroupNumber", keygroupNumber);
    this.router.navigate(['in-memory-program', this.programNumberInMemory, "in-memory-keygroup", +keygroupNumber, "filter1"]);
    super.keygroupOnInit();
  }
}
