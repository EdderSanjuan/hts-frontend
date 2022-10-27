import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { CurpFormComponent } from './curp-form/curp-form.component';
import { SelectComponent } from './select/select.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { ExpedienteFormComponent } from './expedient-form/expedient-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NamesFormComponent } from './names-form/names-form.component';
import { ResulTableComponent } from './result-table/result-table.component';
import { AmaterialModule } from 'src/app/shared/modules/amaterial/amaterial.module';
import { SexPipe } from '@pipes';

@NgModule({
  declarations: [
    SearchComponent,
    CurpFormComponent,
    SelectComponent,
    GeneralFormComponent,
    ExpedienteFormComponent,
    NamesFormComponent,
    ResulTableComponent,
    SexPipe
  ],
  imports: [CommonModule, AmaterialModule, ReactiveFormsModule],
  exports: [SearchComponent, SelectComponent],
})
export class SearchModule {}
