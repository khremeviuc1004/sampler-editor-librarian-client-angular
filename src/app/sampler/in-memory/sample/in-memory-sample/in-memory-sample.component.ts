import { Component, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { SampleScreenCommon } from '../../../../common/sample-screen-common';
import { ScreenTitleComponent } from '../../../screen-title/screen-title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { bandwidths as Bandwidths, samplePlayBackTypes as SamplePlayBackTypes } from '../../../../../util/util';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from '../../../menu/menu.component';
import { NotePipe } from '../../../../pipes/note.pipe';
import { FixedLengthNameFieldComponent } from '../../../fixed-length-name-field/fixed-length-name-field.component';

@Component({
  selector: 'app-in-memory-sample',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTabsModule,
    RouterLink,
    ScreenTitleComponent,
    NzBreadCrumbModule,
    RouterLink,
    NzIconModule,
    MenuComponent,
    NotePipe,
    FixedLengthNameFieldComponent
  ],
  templateUrl: './in-memory-sample.component.html',
  styleUrl: './in-memory-sample.component.scss'
})
export class InMemorySampleComponent extends SampleScreenCommon implements OnInit {

  protected readonly name = signal('');
  bandwidths = Bandwidths;
  samplePlayBackTypes = SamplePlayBackTypes;

  notesRange = Array.from({ length: (128 - 21)}, (_, index) => index + 21);

  constructor(route: ActivatedRoute){
    super(route);
  }

  ngOnInit(): void {
    super.sampleOnInit();
  }

  override doExtraStuff(): void {
    if (this.sampleHeader) {
      this.name.set(this.sampleHeader.name.trim());
    }
  }

  protected onInput(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }
}
