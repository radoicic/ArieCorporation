import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTeamEditComponent } from './vaccine-team-edit.component';

describe('VaccineTeamEditComponent', () => {
  let component: VaccineTeamEditComponent;
  let fixture: ComponentFixture<VaccineTeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineTeamEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
