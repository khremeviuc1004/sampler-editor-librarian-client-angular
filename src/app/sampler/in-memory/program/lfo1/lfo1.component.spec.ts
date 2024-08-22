import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lfo1Component } from './lfo1.component';

describe('Lfo1Component', () => {
  let component: Lfo1Component;
  let fixture: ComponentFixture<Lfo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lfo1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
