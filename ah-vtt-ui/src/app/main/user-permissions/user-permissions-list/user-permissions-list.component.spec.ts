import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionsListComponent } from './user-permissions-list.component';

describe('UserPermissionsListComponent', () => {
  let component: UserPermissionsListComponent;
  let fixture: ComponentFixture<UserPermissionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPermissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
