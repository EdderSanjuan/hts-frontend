import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { qrInfo } from '@interfaces';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent{
  @ViewChild('qr-data') htmlData !: ElementRef;
  

  constructor(private dialogRef : MatDialogRef<QrComponent>,
              @Inject(MAT_DIALOG_DATA) public data : qrInfo) { }
  
               
  public onClickNo():void{
    this.dialogRef.close();
  }

  public closeDialog():void{
    this.generatePDF();
    this.dialogRef.close(true);
   
  }

  public generatePDF(){
    let data : HTMLElement = document.getElementById('qr-data') as HTMLElement;
    html2canvas(data).then((canvas) => {
      let fileWidth = 207;
      let fileHeight =  (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let pdf = new jsPDF({
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
      })
      let position = 50;
      pdf.addImage(FILEURI, 'PNG', position, position, fileWidth, fileHeight);
      pdf.save('QR-paciente');
    });
  }
}
