import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectAssignmentComponent } from './effect-assignment.component';

describe('EffectAssignmentComponent', () => {
  let component: EffectAssignmentComponent;
  let fixture: ComponentFixture<EffectAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EffectAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
