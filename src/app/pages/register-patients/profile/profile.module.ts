import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcapComponent } from './webcap/webcap.component';
import { PreviewComponent } from './preview/preview.component';
import { ProfileComponent} from './profile.component'
import {WebcamModule} from 'ngx-webcam';
import { AmaterialModule } from '@modules';


@NgModule({
  declarations: [
    WebcapComponent,
    PreviewComponent,
    ProfileComponent
    
  ],
  imports: [
    CommonModule,
    WebcamModule,
    AmaterialModule
  ],
  exports:[ProfileComponent]

})
export class ProfileModule { }
