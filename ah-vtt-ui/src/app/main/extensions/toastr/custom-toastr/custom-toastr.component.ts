import { Component } from '@angular/core';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

import { toastrSlideY } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.animation';

@Component({
  selector: '[app-custom-toastr-component]',
  templateUrl: './custom-toastr.component.html',
  animations: [toastrSlideY],
  preserveWhitespaces: false
})
export class CustomToastrComponent extends Toast {
  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }
}
