import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppConstants } from 'shared/app.constant';

@Component({
  selector: 'app-auth-forgot-password-form',
  templateUrl: './auth-forgot-password-form.component.html',
  styleUrls: ['./auth-forgot-password-form.component.scss']
})
export class AuthForgotPasswordFormComponent implements OnChanges {

  @Input()
  public mainFormData: { [key: string] : AbstractControl<any, any> };
  public coreConfig: any;
  public forgotPasswordForm: UntypedFormGroup;
  public submitted = false;
  public loading: boolean = false;
  public error = ''
  public passwordTextType = false;
  @Output()
  emailSend: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  backToMain: EventEmitter<void> = new EventEmitter<void>();

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastr: ToastrService) { 
    this._unsubscribeAll = new Subject<any>();
  }

  get formData() {
    return this.forgotPasswordForm.controls;
  }

  ngOnChanges(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: [this.mainFormData?.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  async onSubmit(){
    try{
      this.submitted = true;

      // stop here if form is invalid
      if (this.forgotPasswordForm.invalid) {
        return;
      }

      if(this.formData.password.value !== this.formData.confirmPassword.value){
        this._toastr.error('Passwords dont match');
        return;
      }

      this.loading = true;
      await this._authenticationService.processPasswordReset(this.formData.email.value, this.formData.password.value, this.formData.code.value).toPromise();
      this.loading = false;
      this._toastr.success('Password reset successfully')
      this._router.navigate(['/authentication/login']);
    }
    catch(err){
      if(err instanceof HttpErrorResponse && err.error){
        this.error = err.error;
      }
      else{
        this.error = AppConstants.genericError
      }
      this.loading = false;
    }
    
  }
  
  async resendCode(){
    await this._authenticationService.beginPasswordReset(this.formData.email.value).toPromise();
    this._toastr.info('Code resent');
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

}
