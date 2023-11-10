import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { cloneDeep } from 'lodash';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';

@Component({
  selector: 'app-feather',
  templateUrl: './feather.component.html',
  styleUrls: ['./feather.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeatherComponent implements OnInit {
  // Public
  public contentHeader: object;
  public json = require('feather-icons/dist/icons.json');
  public copyCodeStatus: boolean = false;
  public searchText;
  public data;

  // Private
  private options: GlobalConfig;

  /**
   * Constructor
   *
   * @param {ToastrService} toastr
   */
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  //  Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Copy
   *
   * @param value
   */
  copy(value) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = value;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    setTimeout(() => {
      this.copyCodeStatus = false;
    }, 500);
    this.copyCodeStatus = true;

    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('Icon Copied Successfully !!!', value, customToastrRef);
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.data = this.json;
    this.contentHeader = {
      headerTitle: 'Feather Icons',
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
            name: 'UI',
            isLink: true,
            link: '/'
          },
          {
            name: 'Feather Icons',
            isLink: false
          }
        ]
      }
    };
  }
}
