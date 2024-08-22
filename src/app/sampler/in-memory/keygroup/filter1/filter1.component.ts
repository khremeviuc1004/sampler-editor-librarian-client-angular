import { Component, OnInit } from '@angular/core';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { ActivatedRoute } from '@angular/router';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter1',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent],
  templateUrl: './filter1.component.html',
  styleUrl: './filter1.component.scss'
})
export class Filter1Component extends KeygroupScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }
}
