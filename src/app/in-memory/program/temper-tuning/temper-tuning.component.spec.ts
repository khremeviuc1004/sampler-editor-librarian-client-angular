import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperTuningComponent } from './temper-tuning.component';

describe('TemperTuningComponent', () => {
  let component: TemperTuningComponent;
  let fixture: ComponentFixture<TemperTuningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperTuningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
