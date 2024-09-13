import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuComponent } from '../menu/menu.component';
import { ScreenTitleComponent } from '../screen-title/screen-title.component';
import { SamplerService, StatusReportDetail } from '../services/sampler.service';
import { Router } from '@angular/router';
import { ColumnDefinition, DataRetriever, SamplerTableComponent } from '../sampler-table/sampler-table.component';

class StatusReportDataRetriever extends DataRetriever<StatusReportDetail> {

  constructor(samplerService: SamplerService) {
    super(samplerService);
  }

  public override getData(): void {
    if (this.subscription) {
      this.samplerService
      .samplerStatusReport()
      .subscribe(this.subscription);
    }
  }
}

@Component({
  selector: 'app-status-report',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    MenuComponent,
    SamplerTableComponent
  ],
  templateUrl: './status-report.component.html',
  styleUrl: './status-report.component.scss'
})
export class StatusReportComponent {

  samplerService = inject(SamplerService);
  router = inject(Router);

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

  statusReportDataRetriever = new StatusReportDataRetriever(this.samplerService);
  statusReportColumnDefinitions: ColumnDefinition[] = [
    {
      columnDefinitionName: 'name',
      displayName: 'Name'
    },
    {
      columnDefinitionName: 'value',
      displayName: 'Value'
    },
  ];
  @ViewChild('statusReportTable')
  statusReportTable!: SamplerTableComponent<StatusReportDetail>;
}
