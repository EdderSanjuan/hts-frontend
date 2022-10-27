import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidenceComponent } from './residence.component';
import { CurrentAddressComponent } from './current-address/current-address.component';
import { AmaterialModule } from '@modules';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResidenceComponent, CurrentAddressComponent],
  imports: [CommonModule, AmaterialModule, ReactiveFormsModule],
  exports: [ResidenceComponent],
})
export class ResidenceModule {}
