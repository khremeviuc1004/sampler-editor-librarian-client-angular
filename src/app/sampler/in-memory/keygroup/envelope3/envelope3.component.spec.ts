import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Envelope3Component } from './envelope3.component';

describe('Envelope3Component', () => {
  let component: Envelope3Component;
  let fixture: ComponentFixture<Envelope3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Envelope3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Envelope3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
