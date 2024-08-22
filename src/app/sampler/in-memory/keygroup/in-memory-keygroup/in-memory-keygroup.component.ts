import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { ScreenProgramNameComponent } from '../../../screen-program-name/screen-program-name.component';
import { KeygroupScreenCommon } from '../../../../common/keygroup-screen-common';
import { ScreenKeygroupNameComponent } from '../../../screen-keygroup-name/screen-keygroup-name.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { muteGroups as MuteGroups } from '../../../../../util/util';
import { NotePipe } from '../../../../pipes/note.pipe';

@Component({
  selector: 'app-in-memory-keygroup',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatGridListModule, NotePipe, RouterOutlet, MatTabsModule, RouterLink, ScreenTitleComponent, ScreenProgramNameComponent, ScreenKeygroupNameComponent],
  templateUrl: './in-memory-keygroup.component.html',
  styleUrl: './in-memory-keygroup.component.scss'
})
export class InMemoryKeygroupComponent extends KeygroupScreenCommon implements OnInit {

  muteGroups = MuteGroups;

  notesRange = Array.from({ length: (127 - 21)}, (_, index) => index + 21);

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.keygroupOnInit();
  }

  spanLowChanged(lowNote: string) {
    this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, 3, +lowNote);
  }

  spanHighChanged(highNote: string) {
    this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, 4, +highNote);
  }

  muteGroupChanged(muteGroup: string): void {
      this.samplerService.samplerChangeValueInKeygroupHeader(+this.programNumberInMemory, +this.keygroupNumberInMemory, 160, +muteGroup);
  }
}
