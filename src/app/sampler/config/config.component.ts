import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MidiPortsService, PortDetails } from '../../services/midi-ports.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ScreenTitleComponent } from "../screen-title/screen-title.component";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorageService } from 'ngx-webstorage';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatCardModule, ScreenTitleComponent, MatButtonModule, MatMenuModule, MenuComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent implements OnInit, AfterViewInit {

  router = inject(Router);

  displayedColumns: string[] = ['connected', 'id', 'name'];

  midiPortsService = inject(MidiPortsService);

  midiInputPortsDataSource = new MatTableDataSource<PortDetails>(new Array<PortDetails>());
  @ViewChild('midiInputPortsPaginator')
  midiInputPortPaginator!: MatPaginator;

  midiOutputPortsDataSource = new MatTableDataSource<PortDetails>(new Array<PortDetails>());
  @ViewChild('midiOutputPortsPaginator')
  midiOutputPortsPaginator!: MatPaginator;

  midiPortConnections!: PortDetails[];

  localStorageService =  inject(LocalStorageService);


  ngOnInit(): void {
    this.midiPortsService.getMidiConnections().subscribe(midiPortConnectionsApi => {
      this.midiPortConnections = midiPortConnectionsApi;
    });
    this.midiPortsService.getMidiInputPorts().subscribe(midiInputPortsApi => {
      this.midiInputPortsDataSource = new MatTableDataSource<PortDetails>(midiInputPortsApi);
      this.midiInputPortsDataSource.paginator = this.midiInputPortPaginator;

      // get the midi input port index
      const midiInputPortName = this.localStorageService.retrieve('midiInputPortName');
      if (midiInputPortName) {
        const midiInputPort = this.midiInputPortsDataSource.data.find(inputPortDetails => inputPortDetails.name === midiInputPortName);

        if (midiInputPort) {
          if (!this.isInputPortConnected(midiInputPort)) {
            this.toggleInputCheckbox(midiInputPort);
          }
        }
      }
    });
    this.midiPortsService.getMidiOutputPorts().subscribe(midiOutputPortsApi => {
      this.midiOutputPortsDataSource = new MatTableDataSource<PortDetails>(midiOutputPortsApi);
      this.midiOutputPortsDataSource.paginator = this.midiOutputPortsPaginator;

      // get the midi output port index
      const midiOutputPortName = this.localStorageService.retrieve('midiOutputPortName');
      if (midiOutputPortName) {
        const midiOutputPort = this.midiOutputPortsDataSource.data.find(outputPortDetails => outputPortDetails.name === midiOutputPortName);

        if (midiOutputPort) {
          if (!this.isOutputPortConnected(midiOutputPort)) {
            this.toggleOutputCheckbox(midiOutputPort);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.midiInputPortsDataSource.paginator = this.midiInputPortPaginator;
  }

  toggleInputCheckbox(midiInputPortDetails: PortDetails) {
    midiInputPortDetails.connected = !midiInputPortDetails.connected;
    if (midiInputPortDetails.connected) {
      this.midiPortsService.connectToMidiInputPort(midiInputPortDetails.id).subscribe(response => console.log(response));
      this.localStorageService.store('midiInputPortName', midiInputPortDetails.name);
    }
  }

  isInputPortConnected(midiOutputPortDetails: PortDetails) : boolean {
    return this.midiPortConnections.filter(portDetails => portDetails.is_input).findIndex(portDetails => portDetails.id === midiOutputPortDetails.id) != -1;
  }

  toggleOutputCheckbox(midiOutputPortDetails: PortDetails) {
    midiOutputPortDetails.connected = !midiOutputPortDetails.connected;
    if (midiOutputPortDetails.connected) {
      this.midiPortsService.connectToMidiOutputPort(midiOutputPortDetails.id).subscribe(response => console.log(response));
      this.localStorageService.store('midiOutputPortName', midiOutputPortDetails.name);
    }
  }

  isOutputPortConnected(row: PortDetails) : boolean {
    return this.midiPortConnections?.filter(portDetails => !portDetails.is_input).findIndex(portDetails => portDetails.id === row.id) != -1;
  }

  routeToSamplerPage() {
    this.router.navigate(["sampler"]);
  }
}
