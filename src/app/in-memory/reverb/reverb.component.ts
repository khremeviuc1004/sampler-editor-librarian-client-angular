import {
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../services/sampler.service';
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
import { reverbType } from '../../../util/util';
import { MenuComponent } from '../../menu/menu.component';
import { StereoPanPipe } from '../../pipes/stereo-pan.pipe';
import { ToastrService } from 'ngx-toastr';
import { FixedLengthNameFieldComponent } from '../../fixed-length-name-field/fixed-length-name-field.component';
import { ColumnDefinition, DataRetriever, SamplerTableComponent, WHOLE } from '../../sampler-table/sampler-table.component';

class ReverbsDataRetriever extends DataRetriever<string> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerReverbs()
      .subscribe(this.subscription);
    }
  }
}

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
    FixedLengthNameFieldComponent,
    SamplerTableComponent
  ],
  templateUrl: './reverb.component.html',
  styleUrl: './reverb.component.scss',
})
export class ReverbComponent {
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

  reverbNumberInMemory = -1;
  reverbHeader: Reverb | null = null;

  reverbType = reverbType;

  nameFilterPredicate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    filter: string,
  ) => {
    if (data.name) {
      return (
        data['name']
          .toLowerCase()
          .indexOf(filter.toLowerCase()) != -1
      );
    }

    return false;
  };
  reverbsDataRetriever = new ReverbsDataRetriever(this.samplerService);
  reverbColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      type: WHOLE,
      displayName: 'Name'
    },
  ];
  @ViewChild('reverbsTable')
  reverbsTable!: SamplerTableComponent<string>;

  constructor(route: ActivatedRoute, private toastr: ToastrService) {
    this.route = route;
  }

  onRowClick(value: number) {
    console.log("onRowClick", value);
    this.reverbNumberInMemory = value;
    this.samplerService
    .samplerReverb(+this.reverbNumberInMemory)
    .subscribe((reverb) => {
      console.log('Reverb', reverb);
      this.reverbHeader = reverb;
    });
  }

  protected onReverbNameChange(value: string) {
    this.samplerService.samplerReverbUpdateName(
      +this.reverbNumberInMemory,
      value,
      (success: boolean) => {
        console.log('Reverb name updated', success);
        if (success) {
          this.toastr.success('Success', 'Updated the reverb name');
          this.reverbsTable.loadData();
        }
        else {
          this.toastr.error('Error', 'Could not update the reverb name');
        }
      }
    );
  }
}
