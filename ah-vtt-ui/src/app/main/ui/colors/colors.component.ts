import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorsComponent implements OnInit {
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
      headerTitle: 'Colors',
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
            name: 'Colors',
            isLink: false
          }
        ]
      }
    };
  }
}
