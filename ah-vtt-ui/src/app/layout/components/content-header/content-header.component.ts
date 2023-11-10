import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Params } from '@angular/router';

// ContentHeader component interface
export interface ContentHeader {
  headerTitle: string;
  actionButton: boolean;
  breadcrumb?: {
    type?: string;
    links?: Array<{
      name?: string;
      isLink?: boolean;
      link?: string;
      queryParams?: Params;
    }>;
  };
  dropdownSettings?: {
    id: number;
    icon?: string;
    text: string;
    link?: string;
    isLink: boolean;
    emit: boolean
  }[]
}

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html'
})
export class ContentHeaderComponent {
  // input variable
  @Input() contentHeader: ContentHeader;
  @Output() settingClicked: EventEmitter<number> = new EventEmitter<number>()

  constructor() {}
  onSettingClick(setting){
    if(setting.emit)
      this.settingClicked.next(setting.id)
  }


}
