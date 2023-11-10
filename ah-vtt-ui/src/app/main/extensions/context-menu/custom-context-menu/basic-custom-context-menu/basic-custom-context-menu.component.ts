import { Component, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { cloneDeep } from 'lodash';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { ContextMenuService } from '@ctrl/ngx-rightclick';
import { MenuPackage } from '@ctrl/ngx-rightclick';
import { MenuComponent } from '@ctrl/ngx-rightclick';

import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';

@Component({
  selector: 'app-basic-custom-context-menu',
  templateUrl: './basic-custom-context-menu.component.html',
  styleUrls: ['../../context-menu.component.scss'],
  animations: [
    trigger('menu', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => *', animate(0))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class BasicCustomContextMenuComponent extends MenuComponent {
  // private
  private options: GlobalConfig;

  /**
   * Constructor
   *
   * @param {ToastrService} toastr
   * @param {MenuPackage} menuPackage
   * @param {ContextMenuService} contextMenuService
   */
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
    private toastr: ToastrService
  ) {
    super(menuPackage, contextMenuService);
    this.options = this.toastr.toastrConfig;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  handleClick(msg: string) {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('', msg, customToastrRef);
    this.contextMenuService.closeAll();
  }
}
