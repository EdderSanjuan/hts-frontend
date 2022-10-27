import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr.component';
import { AmaterialModule } from '@modules';

@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    AmaterialModule,
  ],
  exports:[QrComponent]
 

})
export class QrModule { }
