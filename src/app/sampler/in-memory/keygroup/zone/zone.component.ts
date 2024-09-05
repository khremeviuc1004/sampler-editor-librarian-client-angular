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
import { pitch as Pitch, zoneOutputTypes as ZoneOutputTypes, zonePlayBackTypes as ZonePlayBackTypes } from '../../../../../util/util';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [
    MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatInputModule,
    MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent,
    NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,
  ],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class ZoneComponent extends KeygroupScreenCommon implements OnInit {

  samples: string[] = [];
  pitchTypes = Pitch;
  zoneOutputTypes = ZoneOutputTypes;
  zonePlayBackTypes = ZonePlayBackTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
    this.samplerService.samplerRequestResidentSampleNames().subscribe(samples => this.samples = ['No sample', ...samples]);
  }
}
