import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CardAnalyticsService } from 'app/main/ui/card/card-analytics/card-analytics.service';
import { CardAnalyticsComponent } from 'app/main/ui/card/card-analytics/card-analytics.component';

// routing
const routes: Routes = [
  {
    path: 'card/analytics',
    component: CardAnalyticsComponent,
    resolve: {
      css: CardAnalyticsService
    },
    data: { animation: 'analytics' }
  }
];

@NgModule({
  declarations: [CardAnalyticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    NgApexchartsModule,
    NgbModule,
    CoreCommonModule
  ],
  providers: [CardAnalyticsService]
})
export class CardAnalyticsModule {}
