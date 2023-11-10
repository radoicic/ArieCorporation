import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { TourComponent } from 'app/main/extensions/tour/tour.component';

// routing
const routes: Routes = [
  {
    path: 'tour',
    component: TourComponent,
    data: { animation: 'tour' }
  }
];

@NgModule({
  declarations: [TourComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, CardSnippetModule]
})
export class TourModule {}
