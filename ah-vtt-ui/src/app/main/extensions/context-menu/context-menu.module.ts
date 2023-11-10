import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ContextMenuComponent } from 'app/main/extensions/context-menu/context-menu.component';

// routing
const routes: Routes = [
  {
    path: 'context-menu',
    component: ContextMenuComponent,
    data: { animation: 'context-menu' }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule, CardSnippetModule, CoreCommonModule]
})
export class ContextMenusModule {}
