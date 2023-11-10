import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionManagementComponent } from './region-management.component';

describe('RegionManagementComponent', () => {
  let component: RegionManagementComponent;
  let fixture: ComponentFixture<RegionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
