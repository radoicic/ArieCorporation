import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRolesAddComponent } from './staff-roles-add.component';

describe('StaffRolesAddComponent', () => {
  let component: StaffRolesAddComponent;
  let fixture: ComponentFixture<StaffRolesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRolesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRolesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
