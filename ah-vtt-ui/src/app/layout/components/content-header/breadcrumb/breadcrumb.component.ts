import { Component, OnInit, Input } from '@angular/core';
import { Params } from '@angular/router';

// Breadcrumb component interface
export interface Breadcrumb {
  type?: string;
  alignment?: string;
  links?: Array<{
    name: string;
    isLink: boolean;
    link?: string;
    queryParams?: Params;
  }>;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  // input variable
  @Input() breadcrumb: Breadcrumb;

  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // concatenate default properties with passed properties
    this.breadcrumb = this.breadcrumb;
  }
}
