import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditComponent } from './staff-edit.component';

describe('StaffEditComponent', () => {
  let component: StaffEditComponent;
  let fixture: ComponentFixture<StaffEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
