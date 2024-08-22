import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortamentoComponent } from './portamento.component';

describe('PortamentoComponent', () => {
  let component: PortamentoComponent;
  let fixture: ComponentFixture<PortamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
