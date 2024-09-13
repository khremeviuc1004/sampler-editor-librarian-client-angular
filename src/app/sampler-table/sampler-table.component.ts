import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SamplerService } from '../services/sampler.service';
import { MatSelectModule } from '@angular/material/select';

export interface ColumnDefinition {
  columnDefinitionName: string;
  type?: string;
  displayName: string;
  formatDisplayText?: (displayColumnData: number | string | boolean) => string;
  selectionValues?: string[];
};

export abstract class DataRetriever<T> {
  public subscription: ((data: T[]) => void) | null = null;
  public samplerService: SamplerService;

  constructor(samplerService: SamplerService) {
    this.samplerService = samplerService;
  }

  public abstract getData(): void;
}

export interface SelectCellChange {
  rowIndex: number;
  selectIndex: number;
}

export const INDEX = 'index'; // special action column with fixed optional buttons edit and delete
export const WHOLE = 'whole'; // special action column with fixed optional buttons edit and delete
export const ACTION = 'action'; // data structure is a string or number or boolean etc., not an object with fields
export const SELECT = 'select'; // column has a select component in it

@Component({
  selector: 'app-sampler-table',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './sampler-table.component.html',
  styleUrl: './sampler-table.component.scss'
})
export class SamplerTableComponent<T> implements OnInit {
  public readonly INDEX = INDEX;
  public readonly WHOLE = WHOLE;
  public readonly ACTION = ACTION;
  public readonly SELECT = SELECT;

  @Input()
  title = '';
  selectedRowNumber = -1;
  @Input()
  showRowActions = false;
  @Input()
  showRowEditButton = false;
  @Output()
  doEditRow = new EventEmitter();
  @Input()
  showRowDeleteButton = false;
  @Output()
  doDeleteRow = new EventEmitter();
  @Input()
  showRowAddButton = false;
  @Output()
  doAddRow = new EventEmitter();
  @Input()
  pageSizesInRows = [5];
  @Input()
  itemDataSource = new MatTableDataSource<T>([]);
  @ViewChild('tablePaginator')
  tablePaginator!: MatPaginator;
  itemsLoading = true;
  @Input()
  dataRetriever!: DataRetriever<T>;
  @Input()
  columnDefinitions!: ColumnDefinition[];
  displayedColumns = new Array<string>();
  @Input()
  filterPredicate!: (data: T, filter: string) => boolean;
  @Output()
  doSelectedRowChanged = new EventEmitter();
  @Input()
  allowRowSelection = false;
  @Input()
  rowSelectionDeterminer = (itemDetails: T, rowIndex: number, selectedRowNumber: number) => {
    return rowIndex === selectedRowNumber;
  }
  @Output()
  doSelectValueChange = new EventEmitter();

  ngOnInit(): void {
    this.displayedColumns = this.columnDefinitions.map((columnDefinition) => columnDefinition.columnDefinitionName);
    this.itemDataSource.filterPredicate = this.filterPredicate;
    this.dataRetriever.subscription = (data: T[]) => {
      this.itemDataSource.data = data;
      this.itemDataSource.paginator = this.tablePaginator;
      this.itemsLoading = false;
    };
    this.loadData();
  }

  editItem(rowIndex: number) {
    this.doEditRow.emit(rowIndex);
  }

  addItem() {
    this.doAddRow.emit(this.itemDataSource.data.length);
  }

  deleteItem(rowIndex: number) {
    this.doDeleteRow.emit(rowIndex);
  }

  loadData() {
    this.itemsLoading = true;
    this.dataRetriever.getData();
  }

  onItemFilterInput(event: Event) {
    this.setItemFilter((event.target as HTMLInputElement).value);
  }

  setItemFilter(value: string) {
    this.itemDataSource.filter = value;
  }

  onRowSelected(rowIndex: number) {
    if (this.allowRowSelection) {
      this.selectedRowNumber = rowIndex;
      this.doSelectedRowChanged.emit(rowIndex);
    }
  }

  onSelectValueChanged(rowIndex: number, selectIndex: number) {
    const changeData: SelectCellChange = {
      rowIndex,
      selectIndex
    };
    this.doSelectValueChange.emit(changeData);
  }
}
