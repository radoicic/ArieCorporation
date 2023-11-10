import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CORE_CUSTOM_CONFIG } from '@core/services/config.service';

@NgModule()
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Import CoreModule in the AppModule only');
    }
  }

  static forRoot(config): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: CORE_CUSTOM_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
