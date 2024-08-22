import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { portamentoTypes as PortamentoTypes } from '../../../../../util/util';

@Component({
  selector: 'app-portamento',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent],
  templateUrl: './portamento.component.html',
  styleUrl: './portamento.component.scss'
})
export class PortamentoComponent extends ProgramScreenCommon implements OnInit {

  portamentoTypes = PortamentoTypes;

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  portamentoRateChanged(event: Event) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 110, +(event.target as HTMLInputElement).value);
  }

  portamentoTypeChanged(portamentoType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 111, +portamentoType);
  }

  portamentoEnabledChanged(enabled: boolean) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 112, enabled);
  }
}
