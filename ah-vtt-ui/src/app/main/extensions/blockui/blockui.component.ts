import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import * as snippet from 'app/main/extensions/blockui/blockui.snippetcode';

@Component({
  selector: 'app-blockui',
  templateUrl: './blockui.component.html',
  styleUrls: ['./blockui.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockuiComponent implements OnInit {
  // public
  public contentHeader: object;

  @BlockUI() blockUI: NgBlockUI;

  @BlockUI('section-block') sectionBlockUI: NgBlockUI;

  @BlockUI('card-section') cardBlockUI: NgBlockUI;

  @BlockUI('form-section') formBlockUI: NgBlockUI;

  public _snippetCodeSectionBlocking = snippet.snippetCodeSectionBlocking;
  public _snippetCodeCardBlocking = snippet.snippetCodeCardBlocking;
  public _snippetCodePageBlocking = snippet.snippetCodePageBlocking;
  public _snippetCodeFormBlocking = snippet.snippetCodeFormBlocking;

  /**
   * Constructor
   *
   */
  constructor() {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * full Page BlockUI
   *
   */
  fullPageBlockUI() {
    this.blockUI.start('Loading...'); // Start blocking

    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 2000);
  }

  /**
   * Default Section BlockUI
   *
   */
  defaultSectionBlockUI() {
    this.sectionBlockUI.start();

    setTimeout(() => {
      this.sectionBlockUI.stop();
    }, 2500);
  }

  /**
   * Default Card BlockUI
   *
   */
  defaultCardBlockUI() {
    this.cardBlockUI.start();

    setTimeout(() => {
      this.cardBlockUI.stop();
    }, 2500);
  }

  /**
   * Default Form BlockUI
   *
   */
  defaultFormBlockUI() {
    this.formBlockUI.start();

    setTimeout(() => {
      this.formBlockUI.stop();
    }, 2500);
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'BlockUI',
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
            name: 'BlockUI',
            isLink: false
          }
        ]
      }
    };
  }
}
