import { Component, inject,  ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../../menu/menu.component';
import { ScreenTitleComponent } from '../../screen-title/screen-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplerService } from '../../services/sampler.service';
import { TitleCasePipe } from '@angular/common';
import { ColumnDefinition, DataRetriever, INDEX, SamplerTableComponent, SELECT, SelectCellChange } from '../../sampler-table/sampler-table.component';

class ReverbAssignmentsDataRetriever extends DataRetriever<number> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerProgramReverbAssignments()
      .subscribe(this.subscription);
    }
  }
}

@Component({
  selector: 'app-reverb-assignment',
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
  templateUrl: './reverb-assignment.component.html',
  styleUrl: './reverb-assignment.component.scss'
})
export class ReverbAssignmentComponent {

  route: ActivatedRoute | null = null;
  samplerService = inject(SamplerService);
  router = inject(Router);

  reverbAssignmentsDataRetriever = new ReverbAssignmentsDataRetriever(this.samplerService);
  reverbAssignmentColumnDefinitions: ColumnDefinition[] = [
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
  @ViewChild('reverbsTable')
  reverbsTable!: SamplerTableComponent<string>;

  constructor(route: ActivatedRoute){
    this.route = route;
    this.loadReverbs();
  }

  async loadReverbs() {
    this.samplerService.samplerReverbs().toPromise().then((value) => {
      if (value) {
        this.reverbAssignmentColumnDefinitions[1].selectionValues?.push(...value);
      }
    });
  }

  onSelectValueChanged(assignment: SelectCellChange) {
    console.log("Reverb assignment changed: ", assignment);
    this.samplerService.samplerProgramReverbAssignment(assignment.rowIndex, assignment.selectIndex);
  }
}
