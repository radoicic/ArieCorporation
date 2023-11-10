import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SettingsComponent } from './settings.component';





const routes = [
  {
    path: 'settings/edit',
    component: SettingsComponent,
    data: { animation: 'edit' }
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [SettingsComponent]
})
export class SettingsModule {}
