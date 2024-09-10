import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterOutputComponent } from './master-output.component';

describe('MasterOutputComponent', () => {
  let component: MasterOutputComponent;
  let fixture: ComponentFixture<MasterOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
