import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongRegisterComponent } from './long-register.component';
import { AmaterialModule } from '@modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [LongRegisterComponent],
  imports: [CommonModule, AmaterialModule, ReactiveFormsModule,ProfileModule],
  exports: [LongRegisterComponent],
})
export class LongRegisterModule {}
