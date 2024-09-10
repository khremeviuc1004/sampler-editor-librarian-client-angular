import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchBendComponent } from './pitch-bend.component';

describe('PitchBendComponent', () => {
  let component: PitchBendComponent;
  let fixture: ComponentFixture<PitchBendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitchBendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitchBendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
