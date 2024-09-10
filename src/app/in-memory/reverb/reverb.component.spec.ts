import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverbComponent } from './reverb.component';

describe('ReverbComponent', () => {
  let component: ReverbComponent;
  let fixture: ComponentFixture<ReverbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReverbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReverbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
