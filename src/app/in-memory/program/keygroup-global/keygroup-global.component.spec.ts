import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeygroupGlobalComponent } from './keygroup-global.component';

describe('KeygroupGlobalComponent', () => {
  let component: KeygroupGlobalComponent;
  let fixture: ComponentFixture<KeygroupGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeygroupGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeygroupGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
