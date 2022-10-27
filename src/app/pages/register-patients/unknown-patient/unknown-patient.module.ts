import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnknownPatientComponent } from './unknown-patient.component';
import {AmaterialModule} from '@modules';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UnknownPatientComponent
  ],
  imports: [
    CommonModule,
    AmaterialModule,
    ReactiveFormsModule
  ],
  exports:[UnknownPatientComponent]
})
export class UnknownPatientModule { }
