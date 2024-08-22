import { Component, inject, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ScreenTitleComponent } from "../../../screen-title/screen-title.component";
import { ProgramScreenCommon } from '../../../../common/program-screen-common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-in-memory-program',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, RouterLink, MatTabsModule, RouterOutlet, MatGridListModule, ScreenTitleComponent, NzBreadCrumbModule, NzIconModule],
  templateUrl: './in-memory-program.component.html',
  styleUrl: './in-memory-program.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class InMemoryProgramComponent extends ProgramScreenCommon implements OnInit {

  @ViewChild('keygroupSelect') keygroupSelect?: MatSelect;

  activeLink = '';

  router = inject(Router);

  protected readonly name = signal('');

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    this.programOnInit();
    this.samplerService.samplerRequestProgramHeader(+this.programNumberInMemory).subscribe(program => {
      this.programHeader = program;
      this.name.set(this.programHeader.name.trim());
    });
  }

  protected onInput(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }

  protected onProgramNameChange(event: Event) {
    this.samplerService.samplerChangeNameInProgramHeader(+this.programNumberInMemory, 3, (event.target as HTMLInputElement).value);
  }

  navigateToKeygroup() {
    if (this.programNumberInMemory && this.keygroupSelect && this.keygroupSelect.value) {
      console.log('keygroup: ', this.keygroupSelect.value);
      this.router.navigate(["in-memory-keygroup", this.keygroupSelect.value], { relativeTo: this.route});
      }
  }

  addKeygroup() {
    if (this.programHeader) {
      this.samplerService.samplerNewKeygroup(+this.programNumberInMemory, this.programHeader.numberOfKeyGroups).subscribe(success => {
        if (success) {
          this.samplerService.samplerRequestProgramHeader(+this.programNumberInMemory).subscribe(program => {
            this.programHeader = program;
            this.name.set(this.programHeader.name.trim());
          });
        }
      });
    }
  }

  deleteKeygroup() {
    if (this.programHeader && this.keygroupSelect && this.keygroupSelect.value) {
      this.samplerService.samplerDeleteKeygroup(+this.programNumberInMemory, this.keygroupSelect.value).subscribe(success => {
        if (success) {
          this.samplerService.samplerRequestProgramHeader(+this.programNumberInMemory).subscribe(program => {
            this.programHeader = program;
            this.name.set(this.programHeader.name.trim());
          });
        }
      });
    }
  }
}
