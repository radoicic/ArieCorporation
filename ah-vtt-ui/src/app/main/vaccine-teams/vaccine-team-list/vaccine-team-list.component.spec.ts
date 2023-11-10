import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTeamListComponent } from './vaccine-team-list.component';

describe('VaccineTeamListComponent', () => {
  let component: VaccineTeamListComponent;
  let fixture: ComponentFixture<VaccineTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineTeamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
