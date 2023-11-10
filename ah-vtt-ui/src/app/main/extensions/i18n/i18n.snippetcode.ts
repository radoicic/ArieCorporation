import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodei18n: snippetCode = {
  html: `
  <div class="language-options">
  <div
    *ngFor="let lang of _translateService.getLangs()"
    class="custom-control custom-control-primary custom-radio mb-50"
  >
    <input
      class="i18n-lang-option custom-control-input"
      type="radio"
      name="i18n-lang-radios"
      [checked]="lang === _translateService.currentLang"
      [value]="lang"
      id="{{ languageOptions[lang].title }}"
      (change)="setLanguage($event.target.value)"
    />
    <label class="custom-control-label" for="{{ languageOptions[lang].title }}">
      {{ languageOptions[lang].title }}
    </label>
  </div>
</div>

<div class="card-localization border rounded mt-3 p-2">
  <h5 class="mb-1">{{ 'CARD.TITLE' | translate }}</h5>
  <div class="card-text">{{ 'CARD.TEXT' | translate }}</div>
</div>
`,
  ts: `
  import { TranslateService } from '@ngx-translate/core';
  import { CoreTranslationService } from '@core/services/translation.service';

  import { locale as english } from './data/en';
  import { locale as french } from './data/fr';
  import { locale as german } from './data/de';
  import { locale as portuguese } from './data/pt';

  /**
   * Constructor
   *
   * @param {CoreTranslationService} _coreTranslationService
   * @param {TranslateService} _translateService
   */
  constructor(
    private _coreTranslationService: CoreTranslationService,
    private _translateService: TranslateService
  ) {
    this._coreTranslationService.translate(
      english,
      french,
      german,
      portuguese
    );
  }

  // Public Methods
  // ----------------------------------------------------------------------------------------------------

  /**
   * Set the language
   *
   * @param language
   */
  setLanguage(language) {
    this._translateService.use(language);
  }
  `
};
