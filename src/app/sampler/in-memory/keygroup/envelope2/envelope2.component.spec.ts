import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Envelope2Component } from './envelope2.component';

describe('Envelope2Component', () => {
  let component: Envelope2Component;
  let fixture: ComponentFixture<Envelope2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Envelope2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Envelope2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
