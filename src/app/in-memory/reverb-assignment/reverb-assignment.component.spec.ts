import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverbAssignmentComponent } from './reverb-assignment.component';

describe('ReverbAssignmentComponent', () => {
  let component: ReverbAssignmentComponent;
  let fixture: ComponentFixture<ReverbAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReverbAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverbAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
