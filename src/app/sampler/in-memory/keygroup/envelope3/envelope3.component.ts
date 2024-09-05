import { Component, OnInit, ViewChild } from '@angular/core';
import { FourStageEnvelopeCanvasComponent } from '../four-stage-envelope-canvas/four-stage-envelope-canvas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-envelope3',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatGridListModule, ScreenTitleComponent,
    ScreenProgramNameComponent, ScreenKeygroupNameComponent, FourStageEnvelopeCanvasComponent,
    NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,
  ],
  templateUrl: './envelope3.component.html',
  styleUrl: './envelope3.component.scss'
})
export class Envelope3Component extends KeygroupScreenCommon implements OnInit {

  @ViewChild(FourStageEnvelopeCanvasComponent) canvas1Ref!: FourStageEnvelopeCanvasComponent;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }

  override doExtraStuff(): void {
    if (this.keygroupHeader != null) {
      const rate1 = this.keygroupHeader.envelope3.rate1;
      const level1 = this.keygroupHeader.envelope3.level1;
      const rate2 = this.keygroupHeader.envelope3.rate2;
      const level2 = this.keygroupHeader.envelope3.level2;
      const rate3 = this.keygroupHeader.envelope3.rate3;
      const level3 = this.keygroupHeader.envelope3.level3;
      const rate4 = this.keygroupHeader.envelope3.rate4;
      const level4 = this.keygroupHeader.envelope3.level4;
      this.canvas1Ref.drawEnvelope(rate1, level1, rate2, level2, rate3, level3, rate4, level4);
    }
  }
}
