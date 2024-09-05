import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../../services/sampler.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { Reverb } from 'sampler-editor-librarian-dto';
import { reverbType } from '../../../../util/util';
import { MenuComponent } from '../../menu/menu.component';
import { StereoPanPipe } from '../../../pipes/stereo-pan.pipe';

@Component({
  selector: 'app-reverb',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    MatSelectModule,
    MenuComponent,
    StereoPanPipe,
  ],
  templateUrl: './reverb.component.html',
  styleUrl: './reverb.component.scss',
})
export class ReverbComponent implements OnInit {
  @ViewChild('reverbName') reverbNameInput?: ElementRef;

  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerReverbsDisplayedColumns: string[] = ['name'];

  samplerReverbNamesDataSource = new MatTableDataSource<string>(
    new Array<string>(),
  );
  @ViewChild('reverbsPaginator')
  samplerResidentProgramNamesPaginator!: MatPaginator;
  samplerReverbNamesLoading = true;

  reverbNumberInMemory = '0';
  reverbHeader: Reverb | null = null;
  protected readonly name = signal('');

  reverbType = reverbType;

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit(): void {
    this.samplerReverbNamesDataSource.filterPredicate = (data, filter) => {
      return (
        data
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadReverbs();
  }

  loadReverbs() {
    this.samplerReverbNamesLoading = true;
    this.samplerService.samplerReverbs().subscribe((data) => {
      this.samplerReverbNamesDataSource.data = data;
      this.samplerReverbNamesDataSource.paginator =
        this.samplerResidentProgramNamesPaginator;
      this.samplerReverbNamesLoading = false;
    });
  }

  onReverbNameFilterInput(event: Event) {
    this.setReverbNameFilter((event.target as HTMLInputElement).value);
  }

  setReverbNameFilter(value: string) {
    this.samplerReverbNamesDataSource.filter = value;
  }

  onRowClick(value: string) {
    if (this.reverbNameInput) {
      this.samplerService
        .samplerReverb(this.samplerReverbNamesDataSource.data.indexOf(value))
        .subscribe((reverb) => {
          console.log('Reverb', reverb);
          this.reverbHeader = reverb;
        });
    }
  }

  protected onReverbNameInput(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }

  protected onReverbNameChange(event: Event) {
    this.samplerService.samplerReverbUpdateName(
      +this.reverbNumberInMemory,
      (event.target as HTMLInputElement).value,
    );
  }
}
