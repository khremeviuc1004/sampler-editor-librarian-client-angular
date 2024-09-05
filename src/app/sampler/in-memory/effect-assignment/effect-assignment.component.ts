import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../../services/sampler.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';


interface ProgramEffectAssignment {
  programNumber: number;
  effectNumber: number;
}

@Component({
  selector: 'app-effect-assignment',
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
  templateUrl: './effect-assignment.component.html',
  styleUrl: './effect-assignment.component.scss'
})
export class EffectAssignmentComponent implements OnInit {

  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  samplerEffectsDisplayedColumns: string[] = ['programNumber', 'effectAssignment'];

  samplerEffectNamesDataSource = new MatTableDataSource<ProgramEffectAssignment>(new Array<ProgramEffectAssignment>());
  @ViewChild('effectsPaginator')
  samplerEffectNamesPaginator!: MatPaginator;
  samplerEffectNamesLoading = true;

  effectNames = new Array<string>();


  constructor(route: ActivatedRoute){
    this.route = route;
  }

  ngOnInit(): void {
    this.loadEffects();
    this.samplerEffectNamesDataSource.filterPredicate = (data, filter) => {
      return (data.programNumber + 1).toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1
              || this.effectNames[data.effectNumber].toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
    }
    this.loadEffectAssignments();
  }

  loadEffectAssignments() {
    this.samplerEffectNamesLoading = true;
    this.samplerService.samplerProgramEffectAssignments().subscribe(data => {
      const programEffectAssignment = new Array<ProgramEffectAssignment>();
      data.forEach((value, index) => programEffectAssignment.push({programNumber: index, effectNumber: value}));
      this.samplerEffectNamesDataSource.data = programEffectAssignment;
      this.samplerEffectNamesDataSource.paginator = this.samplerEffectNamesPaginator;
      this.samplerEffectNamesLoading = false;
    });
  }

  loadEffects() {
    this.samplerService.samplerEffects().subscribe(data => {
      this.effectNames = data;
    });
  }

  onEffectNameFilterInput(event: Event) {
    this.setEffectNameFilter((event.target as HTMLInputElement).value);
  }

  setEffectNameFilter(value: string) {
    this.samplerEffectNamesDataSource.filter = value;
  }
}
