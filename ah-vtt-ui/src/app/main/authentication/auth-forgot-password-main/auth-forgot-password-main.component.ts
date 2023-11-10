import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/auth/service';
import { AppConstants } from 'shared/app.constant';

@Component({
  selector: 'app-auth-forgot-password-main',
  templateUrl: './auth-forgot-password-main.component.html',
  styleUrls: ['./auth-forgot-password-main.component.scss']
})
export class AuthForgotPasswordMainComponent implements OnInit {

  public coreConfig: any;
  public forgotPasswordForm: UntypedFormGroup;
  public submitted = false;
  public loading: boolean = false;
  public error: string = '';
  @Output()
  emailSend: EventEmitter<string> = new EventEmitter<string>();

  
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authenticationService: AuthenticationService) { 
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get formData() {
    return this.forgotPasswordForm.controls;
  }

  async onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    try{
      this.loading = true;
      await this._authenticationService.beginPasswordReset(this.formData.email.value).toPromise();
      this.loading = false;
      this.emailSend.emit(this.formData.email.value);
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
    this.loading = false;
  }

}
