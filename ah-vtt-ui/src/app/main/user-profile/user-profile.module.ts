import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { UserProfileComponent } from './user-profile.component';



const routes = [
  {
    path: 'user-profile/edit',
    component: UserProfileComponent,
    data: { animation: 'edit' }
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [UserProfileComponent]
})
export class UserProfileModule {}
