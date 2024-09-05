import { Component, OnInit, ViewChild } from '@angular/core';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { ADSREnvelopeCanvasComponent } from '../adsr-envelope-canvas/adsr-envelope-canvas.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-envelope1',
  standalone: true,
  imports: [
    MatFormFieldModule, MatCheckboxModule, MatInputModule, MatGridListModule,
    ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent, ADSREnvelopeCanvasComponent,
    NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,
  ],
  templateUrl: './envelope1.component.html',
  styleUrl: './envelope1.component.scss'
})
export class Envelope1Component extends KeygroupScreenCommon implements OnInit {

  @ViewChild(ADSREnvelopeCanvasComponent) canvas1Ref!: ADSREnvelopeCanvasComponent;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }

  override doExtraStuff(): void {
    if (this.keygroupHeader != null) {
      const attack = this.keygroupHeader.envelope1.attack;
      const decay = this.keygroupHeader.envelope1.decay;
      const sustain = this.keygroupHeader.envelope1.sustain;
      const release = this.keygroupHeader.envelope1.release;
      this.canvas1Ref.drawEnvelope(attack, decay, sustain, release);
    }
  }
}
