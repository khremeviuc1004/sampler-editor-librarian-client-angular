import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftPedalComponent } from './soft-pedal.component';

describe('SoftPedalComponent', () => {
  let component: SoftPedalComponent;
  let fixture: ComponentFixture<SoftPedalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftPedalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftPedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
