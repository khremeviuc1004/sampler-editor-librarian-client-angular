import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { ActivatedRoute } from '@angular/router';
import { modulationInputSourceTypes as ModulationTypes } from '../../../../../util/util';
import { ModulationSourceType } from 'sampler-editor-librarian-dto';

@Component({
  selector: 'app-pitch',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.scss'
})
export class PitchComponent extends KeygroupScreenCommon implements OnInit {

  modulationTypes= ModulationTypes;
  modulationSourceTypes = ModulationSourceType;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }
}
