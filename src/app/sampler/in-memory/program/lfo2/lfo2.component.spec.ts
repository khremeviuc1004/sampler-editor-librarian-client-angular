import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lfo2Component } from './lfo2.component';

describe('Lfo2Component', () => {
  let component: Lfo2Component;
  let fixture: ComponentFixture<Lfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lfo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
