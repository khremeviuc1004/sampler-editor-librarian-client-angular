import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedLengthNameFieldComponent } from './fixed-length-name-field.component';

describe('FixedLengthNameFieldComponent', () => {
  let component: FixedLengthNameFieldComponent;
  let fixture: ComponentFixture<FixedLengthNameFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedLengthNameFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedLengthNameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
