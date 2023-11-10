import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginMfaComponent } from './auth-login-mfa.component';

describe('AuthLoginMfaComponent', () => {
  let component: AuthLoginMfaComponent;
  let fixture: ComponentFixture<AuthLoginMfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoginMfaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
