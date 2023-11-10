import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRolesListComponent } from './staff-roles-list.component';

describe('StaffRolesListComponent', () => {
  let component: StaffRolesListComponent;
  let fixture: ComponentFixture<StaffRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRolesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
