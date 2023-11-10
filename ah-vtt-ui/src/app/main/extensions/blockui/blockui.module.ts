import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlockUIModule } from 'ng-block-ui';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { BlockuiComponent } from 'app/main/extensions/blockui/blockui.component';

// routing
const routes: Routes = [
  {
    path: 'blockui',
    component: BlockuiComponent,
    data: { animation: 'blockui' }
  }
];

@NgModule({
  declarations: [BlockuiComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    CoreCommonModule,
    BlockUIModule.forRoot()
  ]
})
export class BlockuiModule {}
