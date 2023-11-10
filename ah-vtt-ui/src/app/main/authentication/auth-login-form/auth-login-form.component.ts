import { FormGroup, Validators,UntypedFormBuilder, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthenticationService } from 'app/auth/service';
import { AppConstants } from 'shared/app.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss']
})
export class AuthLoginFormComponent implements OnInit {
  public coreConfig: any;
  @Output()
  private beginMfa: EventEmitter<{ [key: string] : AbstractControl<any, any> }> = new EventEmitter<{ [key: string] : AbstractControl<any, any> }>();
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authenticationService: AuthenticationService
  ) {

    this._unsubscribeAll = new Subject();
  }

  // convenience getter for easy access to form fields
  get formData() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    this._authenticationService
      .login(this.formData.email.value, this.formData.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.beginMfa.emit(this.loginForm.controls);
        },
        error => {
          if(error instanceof HttpErrorResponse && error.error){
            this.error = error.error;
          }
          else{
            this.error = AppConstants.genericError
          }
          this.loading = false;
        }
      );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}






