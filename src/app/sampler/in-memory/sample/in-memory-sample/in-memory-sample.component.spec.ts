import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMemorySampleComponent } from './in-memory-sample.component';

describe('InMemorySampleComponent', () => {
  let component: InMemorySampleComponent;
  let fixture: ComponentFixture<InMemorySampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InMemorySampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMemorySampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
