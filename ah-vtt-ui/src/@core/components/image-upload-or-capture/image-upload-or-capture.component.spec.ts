import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadOrCaptureComponent } from './image-upload-or-capture.component';

describe('ImageUploadOrCaptureComponent', () => {
  let component: ImageUploadOrCaptureComponent;
  let fixture: ComponentFixture<ImageUploadOrCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadOrCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadOrCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
