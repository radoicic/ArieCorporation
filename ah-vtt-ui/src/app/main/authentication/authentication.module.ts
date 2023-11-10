import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthForgotPasswordComponent } from './auth-forgot-password/auth-forgot-password.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginFormComponent } from './auth-login-form/auth-login-form.component';
import { AuthLoginMfaComponent } from './auth-login-mfa/auth-login-mfa.component';
import { AuthForgotPasswordFormComponent } from './auth-forgot-password-form/auth-forgot-password-form.component';
import { AuthForgotPasswordMainComponent } from './auth-forgot-password-main/auth-forgot-password-main.component';

const routes = [
  {
    path: 'authentication/login',
    component: AuthLoginComponent,
    data: { animation: 'login' }
  },
  {
    path: 'authentication/register',
    component: AuthRegisterComponent,
    data: { animation: 'register' }
  },
  {
    path: 'authentication/forgotpassword',
    component: AuthForgotPasswordComponent,
    data: { animation: 'forgotpassword' }
    
  }
]

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthLoginFormComponent,
    AuthLoginMfaComponent,
    AuthRegisterComponent,
    AuthForgotPasswordComponent,
    AuthForgotPasswordFormComponent,
    AuthForgotPasswordMainComponent
  ],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule],
  exports:[
    AuthLoginComponent,
    AuthRegisterComponent
  ]
})
export class AuthenticationModule { }
