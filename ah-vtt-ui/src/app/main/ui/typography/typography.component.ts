import { Component } from '@angular/core';

@Component({
  selector: 'typography',
  templateUrl: './typography.component.html'
})
export class TypographyComponent {
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
      headerTitle: 'Typography',
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
            name: 'Typography',
            isLink: false
          }
        ]
      }
    };
  }
}
