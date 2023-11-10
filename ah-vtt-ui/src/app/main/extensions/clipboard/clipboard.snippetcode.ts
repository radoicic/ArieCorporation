import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeClipboard: snippetCode = {
  html: `
<div class="row">
  <div class="col-xl-3 col-md-4 col-sm-6 col-12 pr-sm-0">
    <div class="form-group">
      <input #clipboardValue type="text" class="form-control" value="Copy Me!" />
    </div>
  </div>
  <div class="col-sm-2 col-12">
    <button class="btn btn-outline-primary" (click)="copyCode(clipboardValue.value)" rippleEffect>Copy!</button>
  </div>
</div>
  `,
  ts: `
  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Copy input text value
   *
   * @param inputTextValue
   */
  copyCode(inputTextValue) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = inputTextValue;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
  }
  `
};
