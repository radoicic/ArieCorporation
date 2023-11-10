import { Component, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { CoreConfigService } from "@core/services/config.service";
import { ForgotPasswordStep } from "@core/types";

@Component({
  selector: "app-auth-forgot-password",
  templateUrl: "./auth-forgot-password.component.html",
  styleUrls: ["./auth-forgot-password.component.scss"],
  //encapsulation: ViewEncapsulation.None
})
export class AuthForgotPasswordComponent implements OnInit {
  // Public
  public mainFormData: { [key: string]: AbstractControl<any, any> } = {};
  public coreConfig: any;
  public step: ForgotPasswordStep = "main";

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  onEmailSend(ev) {
    this.mainFormData = {
      email: ev,
    };
    this.step = 'form'
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
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
