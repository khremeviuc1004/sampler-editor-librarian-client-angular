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
import { MenuComponent } from '../../../menu/menu.component';

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
    MenuComponent
  ],
  templateUrl: './in-memory-sample.component.html',
  styleUrl: './in-memory-sample.component.scss'
})
export class InMemorySampleComponent extends SampleScreenCommon implements OnInit {

  protected readonly name = signal('');
  bandwidths = Bandwidths;
  samplePlayBackTypes = SamplePlayBackTypes;

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
