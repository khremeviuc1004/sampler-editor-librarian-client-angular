import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMemoryProgramComponent } from './in-memory-program.component';

describe('InMemoryProgramComponent', () => {
  let component: InMemoryProgramComponent;
  let fixture: ComponentFixture<InMemoryProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InMemoryProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMemoryProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
