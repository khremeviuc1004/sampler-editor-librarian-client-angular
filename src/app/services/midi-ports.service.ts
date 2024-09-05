import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface PortDetails {
  id: number,
  name: string,
  connected: boolean,
  is_input: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MidiPortsService {

  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:4000/api/midi/';

  getMidiInputPorts(): Observable<PortDetails[]> {
    return this.httpClient.get<PortDetails[]>(this.baseUrl + 'ports/input');
  }

  getMidiOutputPorts(): Observable<PortDetails[]> {
    return this.httpClient.get<PortDetails[]>(this.baseUrl + 'ports/output');
  }

  getMidiConnections(): Observable<PortDetails[]> {
    return this.httpClient.get<PortDetails[]>(this.baseUrl + 'connections');
  }

  connectToMidiInputPort(portId: number): Observable<object> {
    return this.httpClient.post(this.baseUrl + 'ports/input/connect/' + portId, null);
  }

  connectToMidiOutputPort(portId: number): Observable<object> {
    return this.httpClient.post(this.baseUrl + 'ports/output/connect/' + portId, null);
  }
}
