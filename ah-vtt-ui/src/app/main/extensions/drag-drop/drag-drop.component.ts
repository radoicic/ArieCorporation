import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DragulaService } from 'ng2-dragula';

import * as snippet from 'app/main/extensions/drag-drop/drag-drop.snippetcode';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DragDropComponent implements OnInit {
  // public
  public contentHeader: object;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeMultiple = snippet.snippetCodeMultiple;
  public _snippetCodeClone = snippet.snippetCodeClone;
  public _snippetCodeDefault = snippet.snippetCodeDefault;

  constructor(private dragulaService: DragulaService) {
    // Drag And Drop With Handle
    dragulaService.createGroup('handle-list', {
      moves: function (el, container, handle) {
        return handle.classList.contains('handle');
      }
    });

    dragulaService.createGroup('badge-list-copy', {
      copy: true
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Drag & Drop',
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
            name: 'Drag & Drop',
            isLink: false
          }
        ]
      }
    };
  }
}
