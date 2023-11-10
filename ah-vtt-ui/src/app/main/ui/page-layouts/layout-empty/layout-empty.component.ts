import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-empty',
  templateUrl: './layout-empty.component.html',
  styleUrls: ['./layout-empty.component.scss']
})
export class LayoutEmptyComponent implements OnInit {
  // public
  public contentHeader: object;

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Layout Empty',
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
            name: 'Layouts',
            isLink: true,
            link: '/'
          },
          {
            name: 'Layout Empty',
            isLink: false
          }
        ]
      }
    };
  }
}
