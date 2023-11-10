import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CardActionsComponent } from 'app/main/ui/card/card-actions/card-actions.component';

// routing
const routes: Routes = [
  {
    path: 'card/actions',
    component: CardActionsComponent,
    data: { animation: 'actions' }
  }
];

@NgModule({
  declarations: [CardActionsComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, CoreCardModule],
  providers: []
})
export class CardActionsModule {}
