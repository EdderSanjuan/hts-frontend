import { Component, Input } from '@angular/core';
import { activePatient, Paciente } from '@interfaces';
import { RegisterPatientsService } from '@services';
import { registerType } from 'src/app/shared/interfaces/register-type.interface';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResulTableComponent {
  @Input() datos!: Paciente[];

  columnas: string[] = [
    'nombre',
    'apPaterno',
    'apMaterno',
    'sexo',
    'fechaNacimiento',
    'entidadNacimiento',
    'nacionalidad',
    'acciones'
  ];
  constructor(
    private readonly registerPatientsService: RegisterPatientsService
  ) {}

  public selectRegister(type: number , action : number) {
    const data : registerType = {
      registerType : type,
      action : action
    };
  
    this.registerPatientsService.registerSelected.emit(data);
  }

  public checkRow(row : Paciente){
  
    const idpat = row.idPaciente!;
    const noPaciente = row.noPaciente!.toString();
    const exp = row.noExpediente?.toString()!;
    const expType = row.tipoExpediente!;
  
    
    const patient : activePatient = {
      idPatient : idpat,
      patientNumber: noPaciente,
      expedient : exp,
      expedientType : expType,
      actualAction : 2
    };
    
    this.registerPatientsService.setUpdatePatient(patient);
  }
 
}
