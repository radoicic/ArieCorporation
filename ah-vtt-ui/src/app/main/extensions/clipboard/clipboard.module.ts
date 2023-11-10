import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ClipboardComponent } from 'app/main/extensions/clipboard/clipboard.component';

// routing
const routes: Routes = [
  {
    path: 'clipboard',
    component: ClipboardComponent,
    data: { animation: 'clipboard' }
  }
];

@NgModule({
  declarations: [ClipboardComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, CardSnippetModule, CoreCommonModule]
})
export class ClipboardModule {}
