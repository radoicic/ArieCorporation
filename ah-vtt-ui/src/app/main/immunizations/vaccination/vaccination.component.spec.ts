import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationComponent } from './vaccination.component';

describe('VaccinationComponent', () => {
  let component: VaccinationComponent;
  let fixture: ComponentFixture<VaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
