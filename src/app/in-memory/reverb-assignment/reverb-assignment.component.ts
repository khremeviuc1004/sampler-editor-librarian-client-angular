import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../services/sampler.service';
import { TitleCasePipe } from '@angular/common';

interface ProgramReverbAssignment {
  programNumber: number;
  reverbNumber: number;
}

@Component({
  selector: 'app-reverb-assignment',
  standalone: true,
  imports: [
    ScreenTitleComponent,
    MenuComponent,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TitleCasePipe
  ],
  templateUrl: './reverb-assignment.component.html',
  styleUrl: './reverb-assignment.component.scss'
})
export class ReverbAssignmentComponent implements OnInit {

  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerReverbsDisplayedColumns: string[] = ['programNumber', 'reverbAssignment'];

  samplerReverbNamesDataSource = new MatTableDataSource<ProgramReverbAssignment>(new Array<ProgramReverbAssignment>());
  @ViewChild('reverbsPaginator')
  samplerReverbNamesPaginator!: MatPaginator;
  samplerReverbNamesLoading = true;

  reverbNames = new Array<string>();


  constructor(route: ActivatedRoute){
    this.route = route;
  }

  ngOnInit(): void {
    this.loadReverbs();
    this.samplerReverbNamesDataSource.filterPredicate = (data, filter) => {
      return (data.programNumber + 1).toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1
              || this.reverbNames[data.reverbNumber].toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadReverbAssignments();
  }

  loadReverbAssignments() {
    this.samplerReverbNamesLoading = true;
    this.samplerService.samplerProgramReverbAssignments().subscribe(data => {
      const programReverbAssignment = new Array<ProgramReverbAssignment>();
      data.forEach((value, index) => programReverbAssignment.push({programNumber: index, reverbNumber: value}));
      this.samplerReverbNamesDataSource.data = programReverbAssignment;
      this.samplerReverbNamesDataSource.paginator = this.samplerReverbNamesPaginator;
      this.samplerReverbNamesLoading = false;
    });
  }

  loadReverbs() {
    this.samplerService.samplerReverbs().subscribe(data => {
      this.reverbNames = data;
    });
  }

  onReverbNameFilterInput(event: Event) {
    this.setReverbNameFilter((event.target as HTMLInputElement).value);
  }

  setReverbNameFilter(value: string) {
    this.samplerReverbNamesDataSource.filter = value;
  }
}
