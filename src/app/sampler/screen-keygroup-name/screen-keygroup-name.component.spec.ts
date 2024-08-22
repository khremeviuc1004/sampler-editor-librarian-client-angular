import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenKeygroupNameComponent } from './screen-keygroup-name.component';

describe('ScreenKeygroupNameComponent', () => {
  let component: ScreenKeygroupNameComponent;
  let fixture: ComponentFixture<ScreenKeygroupNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenKeygroupNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenKeygroupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
