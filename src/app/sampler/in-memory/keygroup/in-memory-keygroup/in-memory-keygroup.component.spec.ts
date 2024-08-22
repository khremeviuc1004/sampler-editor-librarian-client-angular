import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMemoryKeygroupComponent } from './in-memory-keygroup.component';

describe('InMemoryKeygroupComponent', () => {
  let component: InMemoryKeygroupComponent;
  let fixture: ComponentFixture<InMemoryKeygroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InMemoryKeygroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMemoryKeygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
