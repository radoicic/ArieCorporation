import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFormComponent } from './travel-form.component';

describe('TravelFormComponent', () => {
  let component: TravelFormComponent;
  let fixture: ComponentFixture<TravelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
