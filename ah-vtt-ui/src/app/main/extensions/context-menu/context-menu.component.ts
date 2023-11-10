import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BasicCustomContextMenuComponent } from 'app/main/extensions/context-menu/custom-context-menu/basic-custom-context-menu/basic-custom-context-menu.component';
import { AnimatedCustomContextMenuComponent } from 'app/main/extensions/context-menu/custom-context-menu/animated-custom-context-menu/animated-custom-context-menu.component';
import { SubMenuCustomContextMenuComponent } from 'app/main/extensions/context-menu/custom-context-menu/sub-menu-custom-context-menu/sub-menu-custom-context-menu.component';

import * as snippet from 'app/main/extensions/context-menu/context-menu.snippetcode';
@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextMenuComponent implements OnInit {
  // public
  public contentHeader: object;
  public basicContextMenu = BasicCustomContextMenuComponent;
  public animatedContextMenu = AnimatedCustomContextMenuComponent;
  public subMenuContextMenu = SubMenuCustomContextMenuComponent;

  // snippet code variables
  public _snippetCodeBasicRight = snippet.snippetCodeBasicRight;
  public _snippetCodeAnimatedRight = snippet.snippetCodeAnimatedRight;
  public _snippetCodeSubMenuRight = snippet.snippetCodeSubMenuRight;

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Context Menu',
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
            name: 'Context Menu',
            isLink: false
          }
        ]
      }
    };
  }
}
