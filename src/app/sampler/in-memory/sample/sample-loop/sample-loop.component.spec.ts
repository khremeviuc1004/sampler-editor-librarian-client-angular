import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLoopComponent } from './sample-loop.component';

describe('SampleLoopComponent', () => {
  let component: SampleLoopComponent;
  let fixture: ComponentFixture<SampleLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleLoopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
