import { NgModule } from '@angular/core';

import { CoreSidebarComponent } from '@core/components/core-sidebar/core-sidebar.component';

@NgModule({
  declarations: [CoreSidebarComponent],
  exports: [CoreSidebarComponent]
})
export class CoreSidebarModule {}
