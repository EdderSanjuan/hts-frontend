import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPatientsRoutingModule } from './register-patients-routing.module';
import { RegisterPatientsComponent } from './register-patients.component';
import { SearchModule } from './search/search.module';
import { ShortRegisterModule } from './short-register/short-register.module';
import { LongRegisterModule } from './long-register/long-register.module';
import { ResidenceModule } from './residence/residence.module';
import { AmaterialModule } from '@modules';
import { UnknownPatientModule } from './unknown-patient/unknown-patient.module';
import { QrModule } from './qr/qr.module';

@NgModule({
  declarations: [RegisterPatientsComponent],
  imports: [
    CommonModule,
    RegisterPatientsRoutingModule,
    SearchModule,
    ShortRegisterModule,
    LongRegisterModule,
    ResidenceModule,
    SearchModule,
    AmaterialModule,
    UnknownPatientModule,
    QrModule
    
  ],
})
export class RegisterPatientsModule {}
