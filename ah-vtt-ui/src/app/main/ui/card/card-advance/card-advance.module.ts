import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CardAdvanceService } from 'app/main/ui/card/card-advance/card-advance.service';
import { CardAdvanceComponent } from 'app/main/ui/card/card-advance/card-advance.component';

// routing
const routes: Routes = [
  {
    path: 'card/advance',
    component: CardAdvanceComponent,
    resolve: {
      chatWidget: CardAdvanceService
    },
    data: { animation: 'advance' }
  }
];

@NgModule({
  declarations: [CardAdvanceComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    NgbModule
  ],
  providers: [CardAdvanceService]
})
export class CardAdvanceModule {}
