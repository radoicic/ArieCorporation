import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { I18nComponent } from 'app/main/extensions/i18n/i18n.component';

// routing
const routes: Routes = [
  {
    path: 'i18n',
    component: I18nComponent,
    data: { animation: 'i18n' }
  }
];

@NgModule({
  declarations: [I18nComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ContentHeaderModule, CardSnippetModule, TranslateModule]
})
export class I18nModule {}
