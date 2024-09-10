import { Component, OnInit } from '@angular/core';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScreenProgramNameComponent } from "../../../screen-program-name/screen-program-name.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { priorityTypes as PriorityTypes, reassignmentTypes as ReassignmentTypes } from '../../../../util/util';
import { NotePipe } from '../../../pipes/note.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProgramScreenCommon } from '../../../common/program-screen-common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-midi',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, MatCheckboxModule, ScreenTitleComponent, ScreenProgramNameComponent, NotePipe, NzBreadCrumbModule, RouterLink, NzIconModule, MenuComponent,],
  templateUrl: './midi.component.html',
  styleUrl: './midi.component.scss'
})
export class MidiComponent extends ProgramScreenCommon implements OnInit {

  priorityTypes= PriorityTypes;
  reassignmentTypes = ReassignmentTypes;

  notesRange = Array.from({ length: (128 - 21)}, (_, index) => index + 21);

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.programOnInit();
  }

  programNumberChanged(event: Event) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 15, +(event.target as HTMLInputElement).value - 1);
  }

  priorityChanged(priorityType : string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 18, +priorityType);
  }

  playLowChanged(value: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 19, +value);
  }

  playHighChanged(value: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 20, +value);
  }

  channelChanged(event: Event) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 16, +(event.target as HTMLInputElement).value - 1);
  }

  reassignmentChanged(reassignmentType: string) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 61, +reassignmentType);
  }

  polyphonyChanged(event: Event) {
    this.samplerService.samplerChangeValueInProgramHeader(+this.programNumberInMemory, 17, +(event.target as HTMLInputElement).value - 1);
  }
}
