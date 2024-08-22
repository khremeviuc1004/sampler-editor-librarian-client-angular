import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProgramScreenCommon } from '../../../../common/program-screen-common';

@Component({
  selector: 'app-temper-tuning',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatGridListModule, ScreenTitleComponent, ScreenProgramNameComponent],
  templateUrl: './temper-tuning.component.html',
  styleUrl: './temper-tuning.component.scss'
})
export class TemperTuningComponent extends ProgramScreenCommon implements OnInit {

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  temperAmountChanged(programHeaderIndex: number, event: Event): void {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, programHeaderIndex, +(event.target as HTMLInputElement).value);
  }
}
