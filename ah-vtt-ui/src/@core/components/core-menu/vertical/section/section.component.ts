import { Component, Input } from '@angular/core';

import { CoreMenuItem } from '@core/types';

@Component({
  selector: '[core-menu-vertical-section]',
  templateUrl: './section.component.html'
})
export class CoreMenuVerticalSectionComponent {
  @Input()
  item: CoreMenuItem;
}
