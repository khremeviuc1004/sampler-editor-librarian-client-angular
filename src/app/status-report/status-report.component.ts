import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../menu/menu.component';
import { ScreenTitleComponent } from '../screen-title/screen-title.component';
import { SamplerService } from '../services/sampler.service';
import { Router } from '@angular/router';

interface SamplerStatusRow {
  name: string;
  value: number;
}

@Component({
  selector: 'app-status-report',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScreenTitleComponent,
    MatMenuModule,
    MenuComponent
  ],
  templateUrl: './status-report.component.html',
  styleUrl: './status-report.component.scss'
})
export class StatusReportComponent implements OnInit {

  samplerStatusDisplayedColumns: string[] = ['name', 'value'];

  samplerStatusReportDataSource = new MatTableDataSource<SamplerStatusRow>(
    new Array<SamplerStatusRow>(),
  );
  @ViewChild('statusPaginator')
  samplerStatusReportPaginator!: MatPaginator;
  samplerStatusDataLoading = true;

  samplerService = inject(SamplerService);
  router = inject(Router);

  ngOnInit(): void {
    this.samplerStatusReportDataSource.filterPredicate = (data, filter) => {
      return (
        data.name
          .toString()
          .toLowerCase()
          .indexOf(filter.toString().toLowerCase()) != -1
      );
    };
    this.loadStatusReport();
  }

  loadStatusReport() {
    this.samplerStatusDataLoading = true;
    this.samplerService.samplerStatusReport().subscribe((data) => {
      const samplerStatusData = new Array<SamplerStatusRow>();
      const exclusiveChannel: SamplerStatusRow = {
        name: 'exclusive channel',
        value: data.exclusive_channel,
      };
      samplerStatusData.push(exclusiveChannel);
      const freeBlocks: SamplerStatusRow = {
        name: 'free blocks',
        value: data.free_blocks,
      };
      samplerStatusData.push(freeBlocks);
      const freeWords: SamplerStatusRow = {
        name: 'free words',
        value: data.free_words,
      };
      samplerStatusData.push(freeWords);
      const maxBlocks: SamplerStatusRow = {
        name: 'max blocks',
        value: data.max_blocks,
      };
      samplerStatusData.push(maxBlocks);
      const maxSampleWords: SamplerStatusRow = {
        name: 'max sample words',
        value: data.max_sample_words,
      };
      samplerStatusData.push(maxSampleWords);
      const softwareVersionMajor: SamplerStatusRow = {
        name: 'software version major',
        value: data.software_version_major,
      };
      samplerStatusData.push(softwareVersionMajor);
      const softwareVersionMinor: SamplerStatusRow = {
        name: 'software version minor',
        value: data.software_version_minor,
      };
      samplerStatusData.push(softwareVersionMinor);
      this.samplerStatusReportDataSource.data = samplerStatusData;
      this.samplerStatusReportDataSource.paginator =
        this.samplerStatusReportPaginator;
      this.samplerStatusDataLoading = false;
    });
  }

  onStatusReportFilterInput(event: Event) {
    this.setStatusReportFilter((event.target as HTMLInputElement).value);
  }

  setStatusReportFilter(value: string) {
    this.samplerStatusReportDataSource.filter = value;
  }
}
