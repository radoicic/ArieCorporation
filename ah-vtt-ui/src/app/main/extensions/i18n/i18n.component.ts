import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { CoreTranslationService } from '@core/services/translation.service';

import { locale as english } from 'app/main/extensions/i18n/data/en';
import { locale as french } from 'app/main/extensions/i18n/data/fr';
import { locale as german } from 'app/main/extensions/i18n/data/de';
import { locale as portuguese } from 'app/main/extensions/i18n/data/pt';

import * as snippet from 'app/main/extensions/i18n/i18n.snippetcode';

@Component({
  selector: 'app-i18n',
  templateUrl: './i18n.component.html'
})
export class I18nComponent implements OnInit {
  languageOptions: any;

  // public
  public contentHeader: object;

  // snippet code variables
  public _snippetCodei18n = snippet.snippetCodei18n;

  /**
   * Constructor
   *
   * @param {CoreTranslationService} _coreTranslationService
   * @param {TranslateService} _translateService
   */
  constructor(private _coreTranslationService: CoreTranslationService, public _translateService: TranslateService) {
    this.languageOptions = {
      en: {
        title: 'English',
        flag: 'us'
      },
      fr: {
        title: 'French',
        flag: 'fr'
      },
      de: {
        title: 'German',
        flag: 'de'
      },
      pt: {
        title: 'Portuguese',
        flag: 'pt'
      }
    };

    this._coreTranslationService.translate(english, french, german, portuguese);
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'i18n',
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
            name: 'Extensions',
            isLink: true,
            link: '/'
          },
          {
            name: 'i18n',
            isLink: false
          }
        ]
      }
    };
  }
}
