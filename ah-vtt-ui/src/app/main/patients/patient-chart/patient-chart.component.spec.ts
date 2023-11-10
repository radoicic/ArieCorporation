import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChartComponent } from './patient-chart.component';

describe('PatientChartComponent', () => {
  let component: PatientChartComponent;
  let fixture: ComponentFixture<PatientChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
