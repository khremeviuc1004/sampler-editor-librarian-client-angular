import { Component, inject, ViewChild } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../services/sampler.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TitleCasePipe } from '@angular/common';
import { ColumnDefinition, DataRetriever, INDEX, SamplerTableComponent, SELECT, SelectCellChange } from '../../sampler-table/sampler-table.component';

class EffectAssignmentsDataRetriever extends DataRetriever<number> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerProgramEffectAssignments()
      .subscribe(this.subscription);
    }
  }
}

@Component({
  selector: 'app-effect-assignment',
  standalone: true,
  imports: [
    ScreenTitleComponent,
    MenuComponent,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    TitleCasePipe,
    SamplerTableComponent
  ],
  templateUrl: './effect-assignment.component.html',
  styleUrl: './effect-assignment.component.scss'
})
export class EffectAssignmentComponent {

  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  effectAssignmentsDataRetriever = new EffectAssignmentsDataRetriever(this.samplerService);
  effectAssignmentColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'program',
      type: INDEX,
      displayName: 'Program',
      formatDisplayText: (displayColumnData) => {
        if (typeof(displayColumnData) === 'number' ) {
          return '' + (displayColumnData + 1);
        }
        else return '' + displayColumnData;
      }
    },
    {
      columnDefinitionName: 'assignment',
      displayName: 'Assignment',
      type: SELECT,
      selectionValues: []
    },
];
  @ViewChild('effectsTable')
  effectsTable!: SamplerTableComponent<string>;


  constructor(route: ActivatedRoute){
    this.route = route;
    this.loadEffects();
  }

  async loadEffects() {
    await this.samplerService.samplerEffects().toPromise().then((value) => {
      if (value) {
        this.effectAssignmentColumnDefinitions[1].selectionValues?.push(...value);
      }
    });
  }

  onSelectValueChanged(assignment: SelectCellChange) {
    console.log("Effect assignment changed: ", assignment);
    this.samplerService.samplerProgramEffectAssignment(assignment.rowIndex, assignment.selectIndex);
  }
}
