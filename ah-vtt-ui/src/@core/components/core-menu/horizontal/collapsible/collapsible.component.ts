import { Component, HostListener, HostBinding, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';

import { User } from 'app/auth/models';

@Component({
  selector: '[core-menu-horizontal-collapsible]',
  templateUrl: './collapsible.component.html'
})
export class CoreMenuHorizontalCollapsibleComponent implements OnInit, OnDestroy {
  coreConfig: any;
  currentUser: User;
  isShow = false;

  // Conditionally add the active classes if UrlInChildren
  @HostBinding('class.active')
  @HostBinding('class.open')
  @HostBinding('class.sidebar-group-active')
  public isActive = false;

  @Input()
  item: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreMenuService} _coreMenuService
   */
  constructor(
    private el: ElementRef,
    private _router: Router,
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    // Subscribe to the current menu changes
    this._coreMenuService.onMenuChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.currentUser = this._coreMenuService.currentUser;
    });

    // Listen for router events and expand
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        // Confirm if the urlAfterRedirects can be found in one of the children of this item
        if (this.confirmUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      });

    // Check if the url can be found in one of the children of this item
    // Required for onInit case (i.e switching theme customizer menu layout)
    if (this.confirmUrlInChildren(this.item, this._router.url)) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open
   */
  @HostListener('mouseenter')
  show(): void {
    this.isShow = true;
    this.setSubMenuProp();
  }

  /**
   * Close
   */
  @HostListener('mouseleave')
  hide(): void {
    this.isShow = false;
  }

  /**
   * Set sub-menu properties based on screen size
   *
   */
  setSubMenuProp(): void {
    setTimeout(() => {
      let nativeElement = this.el.nativeElement,
        nativeElementChildren = this.el.nativeElement.children[1];
      // If element has sub menu
      if (nativeElement.classList.contains('dropdown-submenu')) {
        const innerHeight = window.innerHeight,
          dropdownTop = nativeElementChildren.getBoundingClientRect().top,
          dropdownLeft = nativeElementChildren.getBoundingClientRect().left,
          dropdownHeight = nativeElementChildren.scrollHeight,
          dropdownWidth = nativeElementChildren.scrollWidth;

        //Set sub-menu height
        if (innerHeight - dropdownTop - dropdownHeight - 28 < 1) {
          let maxHeight = innerHeight - dropdownTop - 25;
          nativeElementChildren.setAttribute(
            'style',
            'overflow-y: auto; overflow-x: hidden; max-height : ' + maxHeight + 'px'
          );
        }

        // Open sub-menu on left based on screen size (To avoid opn sub-menu outside of the screen)
        if (dropdownLeft + dropdownWidth - (window.innerWidth - 16) >= 0) {
          nativeElementChildren.parentElement.classList.add('openLeft');
        }
      }
    });
  }

  /**
   * Confirms if the provided url can be found in one of the given parent's children
   *
   * @param parent
   * @param url
   * @returns {boolean}
   */
  confirmUrlInChildren(parent, url): boolean {
    const children = parent.children;

    // Return false if parent don't have any children
    if (!children) {
      return false;
    }

    // Loop all the children
    for (const child of children) {
      // If children has child (Sub to sub item url)
      if (child.children) {
        // Call function again with child
        if (this.confirmUrlInChildren(child, url)) {
          return true;
        }
      }

      // If child.url is same as provided url
      if (child.url === url || url.includes(child.url)) {
        return true;
      }
    }

    return false;
  }
}
