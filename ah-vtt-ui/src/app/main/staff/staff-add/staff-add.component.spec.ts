import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddComponent } from './staff-add.component';

describe('StaffAddComponent', () => {
  let component: StaffAddComponent;
  let fixture: ComponentFixture<StaffAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
