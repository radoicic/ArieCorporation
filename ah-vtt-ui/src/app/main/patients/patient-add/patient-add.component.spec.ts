import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddComponent } from './patient-add.component';

describe('PatientAddComponent', () => {
  let component: PatientAddComponent;
  let fixture: ComponentFixture<PatientAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
