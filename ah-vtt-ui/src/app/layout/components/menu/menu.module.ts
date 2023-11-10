import { NgModule } from '@angular/core';

import { CoreCommonModule } from '@core/common.module';

import { MenuComponent } from 'app/layout/components/menu/menu.component';
import { VerticalMenuModule } from 'app/layout/components/menu/vertical-menu/vertical-menu.module';
import { HorizontalMenuModule } from 'app/layout/components/menu/horizontal-menu/horizontal-menu.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CoreCommonModule, VerticalMenuModule, HorizontalMenuModule],
  exports: [MenuComponent]
})
export class MenuModule {}
