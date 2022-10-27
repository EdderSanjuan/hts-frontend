import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortRegisterComponent } from './short-register.component';
import { SearchModule } from '../search/search.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AmaterialModule } from 'src/app/shared/modules/amaterial/amaterial.module';

@NgModule({
  declarations: [ShortRegisterComponent],
  imports: [CommonModule, AmaterialModule, SearchModule, ReactiveFormsModule],
  exports: [ShortRegisterComponent],
})
export class ShortRegisterModule {}
