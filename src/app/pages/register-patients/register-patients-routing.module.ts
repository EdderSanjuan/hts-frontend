import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPatientsComponent } from './register-patients.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterPatientsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPatientsRoutingModule {}
