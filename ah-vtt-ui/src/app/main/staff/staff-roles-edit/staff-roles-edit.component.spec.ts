import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRolesEditComponent } from './staff-roles-edit.component';

describe('StaffRolesEditComponent', () => {
  let component: StaffRolesEditComponent;
  let fixture: ComponentFixture<StaffRolesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRolesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
