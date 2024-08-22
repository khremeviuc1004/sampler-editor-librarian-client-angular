import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { attenuation as Attenuation, filterTypes as FilterTypes, modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter2',
  standalone: true,
  imports: [MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent],
  templateUrl: './filter2.component.html',
  styleUrl: './filter2.component.scss'
})
export class Filter2Component extends KeygroupScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;
  filterTypes = FilterTypes;
  attenuation = Attenuation;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }
}
