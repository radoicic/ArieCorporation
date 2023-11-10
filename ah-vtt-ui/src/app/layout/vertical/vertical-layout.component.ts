import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical-layout.component.html',
  styleUrls: ['./vertical-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayoutComponent implements OnInit, OnDestroy {
  coreConfig: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreConfigService: CoreConfigService, private _elementRef: ElementRef) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
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
