import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, CoreDirectivesModule, CorePipesModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, CoreDirectivesModule, CorePipesModule]
})
export class CoreCommonModule {}
