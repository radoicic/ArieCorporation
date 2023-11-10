import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-card',
  templateUrl: './card-basic.component.html'
})
export class CardBasicComponent implements OnInit {
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
      headerTitle: 'Basic Card',
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
            name: 'Card',
            isLink: true,
            link: '/'
          },
          {
            name: 'Basic Card',
            isLink: false
          }
        ]
      }
    };
  }
}
