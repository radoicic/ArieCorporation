import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DragDropComponent } from 'app/main/extensions/drag-drop/drag-drop.component';

// routing
const routes: Routes = [
  {
    path: 'drag-drop',
    component: DragDropComponent,
    data: { animation: 'todo' }
  }
];

@NgModule({
  declarations: [DragDropComponent],
  imports: [RouterModule.forChild(routes), NgbModule, ContentHeaderModule, CardSnippetModule, DragulaModule.forRoot()]
})
export class DragDropModule {}
