import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTeamAddComponent } from './vaccine-team-add.component';

describe('VaccineTeamAddComponent', () => {
  let component: VaccineTeamAddComponent;
  let fixture: ComponentFixture<VaccineTeamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineTeamAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
