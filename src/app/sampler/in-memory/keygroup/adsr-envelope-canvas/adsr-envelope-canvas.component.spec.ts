import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADSREnvelopeCanvasComponent } from './adsr-envelope-canvas.component';

describe('Envelope1CanvasComponent', () => {
  let component: ADSREnvelopeCanvasComponent;
  let fixture: ComponentFixture<ADSREnvelopeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ADSREnvelopeCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ADSREnvelopeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
