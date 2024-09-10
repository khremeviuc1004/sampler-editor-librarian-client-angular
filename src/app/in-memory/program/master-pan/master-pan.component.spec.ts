import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPanComponent } from './master-pan.component';

describe('MasterPlanComponent', () => {
  let component: MasterPanComponent;
  let fixture: ComponentFixture<MasterPanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterPanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
