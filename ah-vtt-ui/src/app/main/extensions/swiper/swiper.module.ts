import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SwiperComponent } from 'app/main/extensions/swiper/swiper.component';

// swiper configuration
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

// routing
const routes: Routes = [
  {
    path: 'swiper',
    component: SwiperComponent,
    data: { animation: 'swiper' }
  }
];

@NgModule({
  declarations: [SwiperComponent],
  imports: [RouterModule.forChild(routes), CoreCommonModule, ContentHeaderModule, CardSnippetModule, SwiperModule],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class SwipersModule {}
