import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPatientsService } from '@services';
import { PreviewComponent } from './preview/preview.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  
  newImage !: string;
  @Input() initImage !: string;
  @Output() finalImage  = new EventEmitter<string>();

  constructor(private matDialog : MatDialog) { }
 
  public openDialog():void{
    const dialogRef = this.matDialog.open(PreviewComponent,{
      data : this.initImage
    });

    dialogRef.afterClosed().subscribe( res => {
      if(res.status == 1){
        this.newImage = res.image;
        this.finalImage.emit(res.image);
       
      }
    });

  }

}