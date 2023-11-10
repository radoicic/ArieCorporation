import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordFormComponent } from './auth-forgot-password-form.component';

describe('AuthForgotPasswordFormComponent', () => {
  let component: AuthForgotPasswordFormComponent;
  let fixture: ComponentFixture<AuthForgotPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthForgotPasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
