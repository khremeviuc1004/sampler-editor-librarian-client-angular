import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenProgramNameComponent } from './screen-program-name.component';

describe('ScreenProgramNameComponent', () => {
  let component: ScreenProgramNameComponent;
  let fixture: ComponentFixture<ScreenProgramNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenProgramNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenProgramNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
