import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { CoreCommonModule } from '@core/common.module';
import { CoreCardSnippetComponent } from '@core/components/card-snippet/card-snippet.component';

@NgModule({
  declarations: [CoreCardSnippetComponent],
  imports: [CommonModule, NgbModule, HighlightModule, CoreCommonModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  exports: [CoreCardSnippetComponent]
})
export class CardSnippetModule {}
