import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filter1Component } from './filter1.component';

describe('Filter1Component', () => {
  let component: Filter1Component;
  let fixture: ComponentFixture<Filter1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filter1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Filter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
