import { NgModule } from '@angular/core';

import { FilterPipe } from '@core/pipes/filter.pipe';

import { InitialsPipe } from '@core/pipes/initials.pipe';

import { SafePipe } from '@core/pipes/safe.pipe';
import { StripHtmlPipe } from '@core/pipes/stripHtml.pipe';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe]
})
export class CorePipesModule {}
