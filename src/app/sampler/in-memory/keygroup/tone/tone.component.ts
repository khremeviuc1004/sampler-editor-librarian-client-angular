import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { attenuation as Attenuation } from '../../../../../util/util';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-tone',
  standalone: true,
  imports: [
    MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule,
    MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent,
    NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,
  ],
  templateUrl: './tone.component.html',
  styleUrl: './tone.component.scss'
})
export class ToneComponent extends KeygroupScreenCommon implements OnInit {

  attenuation = Attenuation;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }
}
