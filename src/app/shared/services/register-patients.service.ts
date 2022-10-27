/* eslint-disable @typescript-eslint/naming-convention */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientRegister } from '@interfaces';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import {
  AddressRegister,
  Paciente,
  Response,
  activePatient,
  UnknownPatientRegister,
  registerType,
  Domicilio,
} from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegisterPatientsService {
  public registerSelected = new EventEmitter<registerType>();
  public patientActive = new EventEmitter<activePatient>();
  public nextStep = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  public addShortPatient(
    patient: PatientRegister,
    action?: number
  ): Observable<activePatient> {
    return this.http
      .post<Response>(
        `${environment.SERVER_URL}/paciente/registroCorto/registrar`,
        patient
      )
      .pipe(
        map((res) => {
          let active!: activePatient;
          if (res.estatus == 1) {
            if (action === 2) {
              active = {
                idPatient: res.informacion.idPaciente!,
                actualAction: action,
              };
            } else {
              active = {
                idPatient: res.informacion.idPaciente!,
                actualAction: 1,
              };
            }
          }
          this.setUpdatePatient(active);
          return active;
        })
      );
  }

  public addCurrentAddress(address: AddressRegister): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/direcciones/actual/registrarActualizar`,
      address
    );
  }

  public addAlternateAddress(address: AddressRegister): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/direcciones/alternativa/registrarActualizar`,
      address
    );
  }

  public searchPatientByName(patient: Paciente): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/ListaBusquedaPaciente`,
      patient
    );
  }

  public searchPatientByExp(expedient: string): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/consultar-por-expediente/${expedient}`,
      null
    );
  }

  public searchPatientByCurp(curp: string): Observable<Response> {
    const body = { curp };
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/ListaBusquedaPaciente`,
      body
    );
  }

  public updatePatientInfo(id: number): Observable<Paciente> {
    return this.http
      .post<Response>(
        `${environment.SERVER_URL}/paciente/consultar-por-id/${id}`,
        null
      )
      .pipe(
        map((res) => {
          let {
            nombre,
            primerApellido,
            segundoApellido,
            sexo_id,
            fechaNacimiento,
            curp,
            nacionalidad_id,
            entidadNacimiento_id,
            municipioNacimiento_id,
            procedencia_id,
            religion_id,
            estadoCivil_id,
            ocupacion_id,
            escolaridad_id,
            trabajaActualmente_id,
            indigena_id,
            tipoLenguaIndigena_id,
            hablaEspanol_id,
            hablaIndigena_id,
            tipoSangre_id,
            factorRH,
            fechaIdTipoSangre,
            noPaciente,
            noExpediente,
            tipoExpediente,
            entidadNacimiento_cve,
            fotoPaciente,
            telCasa,
            telCelular,
            correo,
            tipoBeneficiario_id
          } = res.informacion.paciente!;

          let data: Paciente = {
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            sexo_id: sexo_id,
            fechaNacimiento: fechaNacimiento,
            curp: curp,
            nacionalidad_id: nacionalidad_id,
            entidadNacimiento_id: entidadNacimiento_id,
            municipioNacimiento_id: municipioNacimiento_id,
            procedencia_id: procedencia_id,
            religion_id: religion_id,
            estadoCivil_id: estadoCivil_id,
            ocupacion_id: ocupacion_id,
            escolaridad_id: escolaridad_id,
            trabajaActualmente_id: trabajaActualmente_id,
            indigena_id: indigena_id,
            tipoLenguaIndigena_id: tipoLenguaIndigena_id,
            hablaEspanol_id: hablaEspanol_id,
            hablaIndigena_id: hablaIndigena_id,
            tipoSangre_id: tipoSangre_id,
            factorRH: factorRH,
            fechaIdTipoSangre: fechaIdTipoSangre,
            noPaciente: noPaciente,
            noExpediente: noExpediente,
            tipoExpediente: tipoExpediente,
            entidadNacimiento_cve: entidadNacimiento_cve,
            fotoPaciente: fotoPaciente,
            telCasa : telCasa,
            telCelular : telCelular,
            correo : correo,
            tipoBeneficiario_id : tipoBeneficiario_id
          };

          return data;
        })
      );
  }

  public getQrInfo(id: number) {
    return this.http
      .post<Response>(
        `${environment.SERVER_URL}/paciente/consultar-por-id/${id}`,
        null
      )
      .pipe(
        map((res) => {
          return res.informacion.paciente;
        })
      );
  }

  public addPatient(
    patient: PatientRegister,
    action?: number
  ): Observable<activePatient> {
    return this.http
      .post<Response>(
        `${environment.SERVER_URL}/paciente/registrarActualizar`,
        patient
      )
      .pipe(
        map((res) => {
          let active!: activePatient;
          if (res.estatus == 1) {
            if (action === 2) {
              active = {
                idPatient: res.informacion.idPaciente!,
                actualAction: action,
              };
            } else {
              active = {
                idPatient: res.informacion.idPaciente!,
                actualAction: 1,
              };
            }
          }
          this.setUpdatePatient(active);
          return active;
        })
      );
  }

  public addUnknownPatient(
    patient: UnknownPatientRegister
  ): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/paciente/registroDesconocido/registrar`,
      patient
    );
  }

  public getQrByIdPatient(id: number): Observable<string> {
    return this.http
      .get<Response>(
        `${environment.SERVER_URL}/paciente/codigoQR?idPaciente=${id}&token`
      )
      .pipe(
        map((res) => {
          return res.informacion.qr!;
        })
      );
  }

  public setUpdatePatient(patient: activePatient): void {
    this.patientActive.emit(patient);
  }

  public getAddressInfo(idPatient: number): Observable<Domicilio[]> {
    return this.http
      .get<Response>(
        `${environment.SERVER_URL}/paciente/consulta-domicilios/${idPatient}`
      )
      .pipe(
        map((res) => {
          return res.informacion.domicilios!;
        })
      );
  }

  public checkCurp(curp: string): Observable<Boolean> {
    const body = { curp: curp };
    return this.http
      .post<Response>(
        `${environment.SERVER_URL}/paciente/validaExistenciaCurp`,
        body
      )
      .pipe(
        switchMap((res) => (res.informacion.exito == 1 ? of(true) : of(false))),
        delay(100)
      );
  }
}
