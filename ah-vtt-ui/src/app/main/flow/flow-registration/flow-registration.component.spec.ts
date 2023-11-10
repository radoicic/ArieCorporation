import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRegistrationComponent } from './flow-registration.component';

describe('FlowRegistrationComponent', () => {
  let component: FlowRegistrationComponent;
  let fixture: ComponentFixture<FlowRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
