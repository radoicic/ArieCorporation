import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordMainComponent } from './auth-forgot-password-main.component';

describe('AuthForgotPasswordMainComponent', () => {
  let component: AuthForgotPasswordMainComponent;
  let fixture: ComponentFixture<AuthForgotPasswordMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthForgotPasswordMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
