import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxed-layout',
  templateUrl: './boxed-layout.component.html',
  styleUrls: ['./boxed-layout.component.scss']
})
export class BoxedLayoutComponent implements OnInit {
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
      headerTitle: 'Layout Boxed',
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
            name: 'Layout Boxed',
            isLink: false
          }
        ]
      }
    };
  }
}
