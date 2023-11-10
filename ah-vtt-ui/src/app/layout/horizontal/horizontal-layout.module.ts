import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from '@core/common.module';

import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ContentModule } from 'app/layout/components/content/content.module';
import { MenuModule } from 'app/layout/components/menu/menu.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';

import { HorizontalLayoutComponent } from 'app/layout/horizontal/horizontal-layout.component';

@NgModule({
  declarations: [HorizontalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, ContentModule, MenuModule, FooterModule],
  exports: [HorizontalLayoutComponent]
})
export class HorizontalLayoutModule {}
