import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTitleComponent } from './screen-title.component';

describe('ScreenTitleComponent', () => {
  let component: ScreenTitleComponent;
  let fixture: ComponentFixture<ScreenTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
