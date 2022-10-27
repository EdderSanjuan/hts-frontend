import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WebcapComponent } from '../webcap/webcap.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  imagePreview!: string;
  constructor(
    private matRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialog: MatDialog
  ) {}

  public openWebcam(): void {
    const dialogweb = this.dialog.open(WebcapComponent, {
      height: '500',
      width: '500',
    });

    dialogweb.afterClosed().subscribe((res) => (this.imagePreview = res));
  }

  public cancelClose(): void {
    this.matRef.close({
      status: 0,
      image: ' ',
    });
  }

  public closeDialog(): void {
    if (this.imagePreview) {
      this.matRef.close({
        status: 1,
        image: this.imagePreview,
      });
    }
  }
}
