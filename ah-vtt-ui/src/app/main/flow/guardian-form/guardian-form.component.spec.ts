import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianFormComponent } from './guardian-form.component';

describe('GuardianFormComponent', () => {
  let component: GuardianFormComponent;
  let fixture: ComponentFixture<GuardianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
