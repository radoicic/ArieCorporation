import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineAddEditComponent } from './vaccine-add-edit.component';

describe('VaccineInventoryAddEditComponent', () => {
  let component: VaccineAddEditComponent;
  let fixture: ComponentFixture<VaccineAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
