import { NgModule } from '@angular/core';

import { CardActionsModule } from 'app/main/ui/card/card-actions/card-actions.module';
import { CardAdvanceModule } from 'app/main/ui/card/card-advance/card-advance.module';
import { CardAnalyticsModule } from 'app/main/ui/card/card-analytics/card-analytics.module';
import { CardBasicModule } from 'app/main/ui/card/card-basic/card-basic.module';
import { CardStatisticsModule } from 'app/main/ui/card/card-statistics/card-statistics.module';

@NgModule({
  declarations: [],
  imports: [CardActionsModule, CardStatisticsModule, CardAnalyticsModule, CardBasicModule, CardAdvanceModule],
  providers: []
})
export class CardModule {}
