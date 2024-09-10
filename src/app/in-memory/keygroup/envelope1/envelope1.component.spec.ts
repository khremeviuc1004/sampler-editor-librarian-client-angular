import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Envelope1Component } from './envelope1.component';

describe('Envelope1Component', () => {
  let component: Envelope1Component;
  let fixture: ComponentFixture<Envelope1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Envelope1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Envelope1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
