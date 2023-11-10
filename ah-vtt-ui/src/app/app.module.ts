import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { PatientModule } from './main/patients/patient.module';
import { StaffModule } from './main/staff/staff.module';
import { UserModule } from './main/users/user.module';
import { VaccineTeamModule } from './main/vaccine-teams/vaccine-teams.module';
import { OrganizationModule } from './main/organization/organization.module';
import { SettingsModule } from './main/settings/settings.module';
import { UserProfileModule } from './main/user-profile/user-profile.module';
import { SettingsComponent } from './main/settings/settings.component';
import { ChildModule } from './main/child/child.module';
import { TravelerModule } from './main/traveler/traveler.module';
import { AuthenticationModule } from './main/authentication/authentication.module';
import { AuthGuard, ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './auth/helpers';
import { ImmunizationsModule } from './main/immunizations/immunizations.module';
import { DatatablesService } from '@core/services/datatable.service';
import { SweetAlertModule } from 'shared/sweet-alert/sweet-alert.module';

import { VaccineManagementService } from 'shared/services/vaccine-management.service';
import { UserPermissionsModule } from './main/user-permissions/user-permissions.module';
import { RegionModule } from './main/region/region.module';
import { FlowModule } from './main/flow/flow.module';
import { ImageUploadOrCaptureModule } from '@core/components/image-upload-or-capture/image-upload-or-capture.module';
import { CookieService } from 'ngx-cookie-service';


const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'immunizations',
    loadChildren: () => import('./main/immunizations/immunizations.module').then(m => m.ImmunizationsModule)
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  },
  {
    path: 'child',
    loadChildren: () => import('./main/child/child.module').then(m => m.ChildModule)
  },
  {
    path: 'traveler',
    loadChildren: () => import('./main/traveler/traveler.module').then(m => m.TravelerModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./main/staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./main/users/user.module').then(m => m.UserModule)
  },  
  {
    path: 'organization',
    loadChildren: () => import('./main/organization/organization.module').then(m => m.OrganizationModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./main/settings/settings.module').then(m => m.SettingsModule)
  },  
  {
    path: 'user-profile',
    loadChildren: () => import('./main/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule)
    //canActivate: [AuthGuard]
  },
  {
    path: 'region',
    loadChildren: () => import('./main/region/region.module').then(m => m.RegionModule)
  },
  {
    path: 'flow',
    loadChildren: () => import('./main/flow/flow.module').then(m => m.FlowModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),
    //NgBootstrap
    NgbModule,
    SweetAlertModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    ImageUploadOrCaptureModule,
    // App modules
    LayoutModule,
    ChildModule,
    TravelerModule,
    StaffModule,
    UserModule,
    VaccineTeamModule,
    OrganizationModule,
    SettingsModule,
    UserProfileModule,
    SampleModule,
    AuthenticationModule,
    ImmunizationsModule,
    UserPermissionsModule,    
    RegionModule,
    FlowModule
  ],
  providers:[
    //provider used to create fake backend
    fakeBackendProvider,
    DatatablesService,
    VaccineManagementService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
