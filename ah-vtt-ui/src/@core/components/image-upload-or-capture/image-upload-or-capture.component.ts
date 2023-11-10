import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddPictureMode } from '@core/types';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-image-upload-or-capture',
  templateUrl: './image-upload-or-capture.component.html',
  styleUrls: ['./image-upload-or-capture.component.scss']
})
export class ImageUploadOrCaptureComponent implements OnInit {
  @Input()
  imageDataUrl = '';
  @Output()
  imageClicked: EventEmitter<string> = new EventEmitter<string>()
  pictureMode: AddPictureMode = AddPictureMode.Click;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor() { }

  async ngOnInit(): Promise<void> {
    const mediaDevices: MediaDeviceInfo[] = await WebcamUtil.getAvailableVideoInputs()
    this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.imageClicked.next(this.webcamImage.imageAsDataUrl);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  async upload(ev: Event){
    let file: File = ev.target['files'][0];
    let base64Str: string = await ImageUploadOrCaptureComponent.toBase64(file) as string;
    this.imageClicked.next(base64Str);
  }

  static toBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  } 

}
