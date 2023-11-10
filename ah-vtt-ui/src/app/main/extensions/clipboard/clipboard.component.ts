import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ToastrService, GlobalConfig } from 'ngx-toastr';

import * as snippet from 'app/main/extensions/clipboard/clipboard.snippetcode';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClipboardComponent implements OnInit {
  // public
  public contentHeader: object;

  // private
  private toastRef: any;
  private options: GlobalConfig;

  // snippet code variables
  public _snippetCodeClipboard = snippet.snippetCodeClipboard;
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
  /**
   * Copy input text value
   *
   * @param inputTextValue
   */
  copyCode(inputTextValue) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = inputTextValue;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    this.toastr.success('', 'Copied sucessfully', { toastClass: 'toast ngx-toastr', closeButton: true });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Clipboard',
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
            name: 'Clipboard',
            isLink: false
          }
        ]
      }
    };
  }
}
