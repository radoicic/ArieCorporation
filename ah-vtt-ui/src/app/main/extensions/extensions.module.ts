import { NgModule } from '@angular/core';

import { BlockuiModule } from 'app/main/extensions/blockui/blockui.module';
import { ClipboardModule } from 'app/main/extensions/clipboard/clipboard.module';
import { ContextMenusModule } from 'app/main/extensions/context-menu/context-menu.module';
import { DragDropModule } from 'app/main/extensions/drag-drop/drag-drop.module';
import { I18nModule } from 'app/main/extensions/i18n/i18n.module';
import { MediaPlayerModule } from 'app/main/extensions/media-player/media-player.module';
import { NouiSliderModule } from 'app/main/extensions/noui-slider/noui-slider.module';
import { SweetAlertsModule } from 'app/main/extensions/sweet-alerts/sweet-alerts.module';
import { SwipersModule } from 'app/main/extensions/swiper/swiper.module';
import { ToastrsModule } from 'app/main/extensions/toastr/toastr.module';
import { TourModule } from 'app/main/extensions/tour/tour.module';
import { TreeViewModule } from 'app/main/extensions/tree-view/tree-view.module';

@NgModule({
  declarations: [],
  imports: [
    TreeViewModule,
    TourModule,
    ClipboardModule,
    SweetAlertsModule,
    NouiSliderModule,
    SwipersModule,
    I18nModule,
    MediaPlayerModule,
    DragDropModule,
    ToastrsModule,
    ContextMenusModule,
    BlockuiModule
  ]
})
export class ExtensionsModule {}
