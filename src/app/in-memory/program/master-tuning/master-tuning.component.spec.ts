import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTuningComponent } from './master-tuning.component';

describe('MasterTuningComponent', () => {
  let component: MasterTuningComponent;
  let fixture: ComponentFixture<MasterTuningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterTuningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
