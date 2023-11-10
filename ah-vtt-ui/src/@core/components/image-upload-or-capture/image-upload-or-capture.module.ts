import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadOrCaptureComponent } from './image-upload-or-capture.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [ImageUploadOrCaptureComponent],
  imports: [
    CommonModule,
    NgbModule,
    HighlightModule,
    CoreCommonModule,
    WebcamModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  exports: [ImageUploadOrCaptureComponent]
})
export class ImageUploadOrCaptureModule { }
