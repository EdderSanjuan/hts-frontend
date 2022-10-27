import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterPatientsService } from '@services';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-webcap',
  templateUrl: './webcap.component.html',
  styleUrls: ['./webcap.component.scss'],
})
export class WebcapComponent implements OnDestroy {
  readonly imageTrigger: Subject<void> = new Subject<void>();
  error?: string;
  constructor(
    private dialogRef: MatDialogRef<WebcapComponent>,
    private registerPatientService: RegisterPatientsService
  ) {}

  ngOnDestroy(): void {
    this.imageTrigger.complete();
  }

  public captureImage(webcamImage: WebcamImage): void {
    this.dialogRef.close(webcamImage.imageAsDataUrl);
  }
  public triggerSnapshot(): void {
    this.imageTrigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    console.warn(error);
    this.error = JSON.stringify(error);
  }
}
