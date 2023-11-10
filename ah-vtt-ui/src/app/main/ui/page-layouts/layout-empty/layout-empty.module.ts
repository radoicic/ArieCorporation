import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { LayoutEmptyComponent } from 'app/main/ui/page-layouts/layout-empty/layout-empty.component';

const routes: Routes = [
  {
    path: 'page-layouts/layout-empty',
    component: LayoutEmptyComponent
  }
];

@NgModule({
  declarations: [LayoutEmptyComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule]
})
export class LayoutEmptyModule {}
