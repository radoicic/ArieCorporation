import { Component, OnInit, Input } from '@angular/core';

// snippetCode interface
export interface snippetCode {
  isCollapsed?: boolean;
  active?: string;
  html?: string;
  ts?: string;
  scss?: string;
  json?: string;
}

@Component({
  selector: 'core-card-snippet',
  templateUrl: './card-snippet.component.html',
  styleUrls: ['./card-snippet.component.scss']
})
export class CoreCardSnippetComponent implements OnInit {
  // public
  public copyCodeStatus: boolean = false;

  // private
  private _defaultSnippetCode: snippetCode = {
    isCollapsed: true // default collapsed is true
  };

  @Input() snippetCode: snippetCode;

  constructor() {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * copyCode
   *
   * @param code
   */
  copyCode(code) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = code;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    setTimeout(() => {
      this.copyCodeStatus = false;
    }, 500);
    this.copyCodeStatus = true;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // concatenate default properties with passed properties
    this.snippetCode = { ...this._defaultSnippetCode, ...this.snippetCode };
  }
}
