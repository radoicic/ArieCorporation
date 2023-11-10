import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlyrModule } from 'ngx-plyr';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { MediaPlayerComponent } from 'app/main/extensions/media-player/media-player.component';

// routing
const routes: Routes = [
  {
    path: 'media-player',
    component: MediaPlayerComponent,
    data: { animation: 'player' }
  }
];

@NgModule({
  declarations: [MediaPlayerComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, CardSnippetModule, PlyrModule]
})
export class MediaPlayerModule {}
