import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourStageEnvelopeCanvasComponent } from './four-stage-envelope-canvas.component';

describe('Envelope1CanvasComponent', () => {
  let component: FourStageEnvelopeCanvasComponent;
  let fixture: ComponentFixture<FourStageEnvelopeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourStageEnvelopeCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourStageEnvelopeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
