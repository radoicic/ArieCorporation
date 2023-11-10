import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { SessionService } from 'app/auth/service/session.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppConstants } from 'shared/app.constant';
import { LoggedInResponse } from '../models/authentication-models';

@Component({
  selector: 'app-auth-login-mfa',
  templateUrl: './auth-login-mfa.component.html',
  styleUrls: ['./auth-login-mfa.component.scss']
})
export class AuthLoginMfaComponent implements OnChanges {
  @Input()
  public loginFormData: { [key: string] : AbstractControl<any, any> };
  public mfaForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public _unsubscribeAll = new Subject();
  @Output()
  public backToForm: EventEmitter<void> = new EventEmitter<void>()
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authenticationService: AuthenticationService,
    private _sessionService: SessionService,
    private _toastrService: ToastrService,
    private _router: Router) { 
    }
  
  
  ngOnChanges(): void {
    this.mfaForm = this._formBuilder.group({
      email: [this.loginFormData?.email?.value, [Validators.required, Validators.email]],
      password: [this.loginFormData?.password?.value, Validators.required],
      otp: ['', Validators.required]
    });
  }

  async onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.mfaForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    await this.beginMfa();
  }

  // convenience getter for easy access to form fields
  get formData() {
    return this.mfaForm?.controls;
  }

  async resendOtp(){
    this.formData.otp.setValue('');
    await this._authenticationService.login(this.formData.email.value, this.formData.password.value).toPromise();
    this._toastrService.info('OTP sent');
  }

  async beginMfa(){
    try{
      var result: LoggedInResponse = await this._authenticationService.login(this.formData.email.value, this.formData.password.value, this.formData.otp.value).toPromise();
      if(this.formData.otp.value){
        this._sessionService.beginSession(result);
        this._router.navigate(['/home']);
      }
    }
    catch(error){
      if(error instanceof HttpErrorResponse && error.error){
        this.error = error.error;
      }
      else{
        this.error = AppConstants.genericError
      }
      this.loading = false;
    }
  }
}