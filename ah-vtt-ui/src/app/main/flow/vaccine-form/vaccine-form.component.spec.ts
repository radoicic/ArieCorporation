import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineFormComponent } from './vaccine-form.component';

describe('VaccineFormComponent', () => {
  let component: VaccineFormComponent;
  let fixture: ComponentFixture<VaccineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
