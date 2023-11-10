import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreDirectivesModule } from '@core/directives/directives';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CardBasicComponent } from 'app/main/ui/card/card-basic/card-basic.component';

// routing
const routes: Routes = [
  {
    path: 'card/card-basic',
    component: CardBasicComponent,
    data: { animation: 'card-basic' }
  }
];

@NgModule({
  declarations: [CardBasicComponent],
  imports: [RouterModule.forChild(routes), CoreDirectivesModule, ContentHeaderModule, NgbModule],
  providers: []
})
export class CardBasicModule {}
