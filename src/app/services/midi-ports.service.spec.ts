import { TestBed } from '@angular/core/testing';

import { MidiPortsService } from './midi-ports.service';

describe('MidiPortsService', () => {
  let service: MidiPortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidiPortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
