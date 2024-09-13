import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplerTableComponent } from './sampler-table.component';

describe('SamplerTableComponent', () => {
  let component: SamplerTableComponent;
  let fixture: ComponentFixture<SamplerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
