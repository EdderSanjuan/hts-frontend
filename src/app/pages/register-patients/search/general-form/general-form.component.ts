import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from '@interfaces';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent {
  @Output() reseteValues = new EventEmitter<boolean>();
  
  opciones: string[] = ['Nombre y Apellidos', 'No. Expediente', 'CURP'];
  selectLabel: string = 'Búsqueda por';

  showNameForm: boolean = false;
  showExpForm: boolean = false;
  showCurpForm: boolean = false;
  showTable: boolean = false;
  existRes : boolean = false;

  pacientes: Paciente[] = [];

  constructor() {}

  public elegirFormulario(valor: any) {
    this.showTable = false;
    this.pacientes = [];
    switch (valor) {
      case 0:
        this.showNameForm = true;
        this.showExpForm = false;
        this.showCurpForm = false;
        break;
      case 1:
        this.showNameForm = false;
        this.showCurpForm = false;
        this.showExpForm = true;
        break;
      case 2:
        this.showNameForm = false;
        this.showExpForm = false;
        this.showCurpForm = true;
        break;
    }
  }

  public getData(pacientes: Paciente[]){
   
      this.existRes = true;
      this.pacientes = pacientes;
      this.showTable = true;
    
  
  }

  public getExpData(paciente : Paciente[]){

   
      this.existRes = true;
      this.pacientes = paciente;
      this.showTable = true;
      
    

  }
  public getCurpData(paciente : Paciente[]){
    
      this.existRes = true;
      this.pacientes = paciente;
      this.showTable = true;
    
    
  }

  public reset(resetEvent: any) {
    if (resetEvent) {
      this.showTable = false;
      this.pacientes = [];
    }
  }
}
