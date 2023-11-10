import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
import * as snippet from 'app/main/extensions/toastr/toastr.snippetcode';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastrComponent implements OnInit {
  // public
  public contentHeader: object;

  // private
  private toastRef: any;
  private options: GlobalConfig;

  // snippet code variables
  public _snippetCodeTypes = snippet.snippetCodeTypes;
  public _snippetCodeTopPositions = snippet.snippetCodeTopPositions;
  public _snippetCodeBottomPositions = snippet.snippetCodeBottomPositions;
  public _snippetCodeOptions = snippet.snippetCodeOptions;
  public _snippetCodeRemove = snippet.snippetCodeRemove;
  public _snippetCodeClear = snippet.snippetCodeClear;
  public _snippetCodeEaseTimeout = snippet.snippetCodeEaseTimeout;
  public _snippetCodeCustomToastr = snippet.snippetCodeCustomToastr;

  /**
   * Constructor
   *
   * @param {ToastrService} toastr
   */
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // Success
  toastrSuccess() {
    this.toastr.success('👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.', 'Success!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Info
  toastrInfo() {
    this.toastr.info('👋 Chupa chups biscuit brownie gummi sugar plum caramels.', 'Info!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Warning
  toastrWarning() {
    this.toastr.warning('👋 Icing cake pudding carrot cake jujubes tiramisu chocolate cake.', 'Warning!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Error
  toastrError() {
    this.toastr.error('👋 Jelly-o marshmallow marshmallow cotton candy dessert candy.', 'Danger!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Top Left
  toastrTopLeft() {
    this.toastr.info('I do not think that word means what you think it means.', 'Top Left!', {
      positionClass: 'toast-top-left',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Top Center
  toastrTopCenter() {
    this.toastr.info('I do not think that word means what you think it means.', 'Top Center!', {
      positionClass: 'toast-top-center',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Top Right
  toastrTopRight() {
    this.toastr.info('I do not think that word means what you think it means.', 'Top Right!', {
      positionClass: 'toast-top-right',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Top Fullwidth
  toastrTopFullWidth() {
    this.toastr.info('I do not think that word means what you think it means.', 'Top Full Width!', {
      positionClass: 'toast-top-full-width',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Bottom Left
  toastrBottomLeft() {
    this.toastr.info('I do not think that word means what you think it means.', 'Bottom Left!', {
      positionClass: 'toast-bottom-left',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Bottom Center
  toastrBottomCenter() {
    this.toastr.info('I do not think that word means what you think it means.', 'Bottom Center!', {
      positionClass: 'toast-bottom-center',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Bottom Right
  toastrBottomRight() {
    this.toastr.info('I do not think that word means what you think it means.', 'Bottom Right!', {
      positionClass: 'toast-bottom-right',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Bottom Fullwidth
  toastrBottomFullWidth() {
    this.toastr.info('I do not think that word means what you think it means.', 'Bottom Full Width!', {
      positionClass: 'toast-bottom-full-width',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Progress Bar
  toastrProgressBar() {
    this.toastr.success('Have fun storming the castle!', 'Progress Bar', {
      progressBar: true,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Clear Toast Button
  toastrClearToastButton() {
    this.toastr.info('Clear itself?<br><br><span class="btn btn-info clear">Yes</span>', 'Clear Toast Button', {
      enableHtml: true,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Rshow
  toastrRShow() {
    this.toastRef = this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Remove
  toastrRemove() {
    this.toastr.remove(this.toastRef.toastId);
  }

  // Cshow
  toastrCShow() {
    this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Clear
  toastrClear() {
    this.toastr.clear();
  }

  // Ease Time
  toastrEaseTime() {
    this.toastr.success('Have fun storming the castle!', 'ease In 1 Sec', {
      easeTime: 1000,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Timeout 3sec
  toastrTimeout3() {
    this.toastr.warning('Have fun storming the castle!', 'timeOut 3 Sec', {
      timeOut: 3000,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Timeout 5sec
  toastrTimeout5() {
    this.toastr.error('I do not think that word means what you think it means.', 'Timeout 5 Sec!', {
      timeOut: 5000,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Stickey
  toastrStickey() {
    this.toastr.info('I do not think that word means what you think it means.', 'Sticky!', {
      timeOut: 0,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  // Custom Success
  toastrCustomSuccess() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('Have fun storming the castle!', 'Success!', customToastrRef);
  }

  // Custom Warning
  toastrCustomWarning() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.warning('Have fun storming the castle!', 'Warning!', customToastrRef);
  }

  // Custom Danger
  toastrCustomDanger() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.error('Have fun storming the castle!', 'Danger!', customToastrRef);
  }

  // Custom Info
  toastrCustomInfo() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.info('Have fun storming the castle!', 'Info!', customToastrRef);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Toastr',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Extensions',
            isLink: true,
            link: '/'
          },
          {
            name: 'Toastr',
            isLink: false
          }
        ]
      }
    };
  }
}
