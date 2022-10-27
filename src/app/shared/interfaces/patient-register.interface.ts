/* eslint-disable @typescript-eslint/naming-convention */
export interface PatientRegister {
  idPaciente ?: number | null;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  sexo_id?: number;
  fechaNacimiento?: Date | string;
  nacionalidad_id?: number;
  entidadNacimiento_id?: number |string;
  municipioNacimiento_id?: number;
  curp?: string;
  telCasa?:number;
  telCelular?:number;
  correo?:number
  desconoceCurp?: number;
  edadAparente?: number;
  escolaridad_id?: number;
  estadoCivil_id?: number;
  factorRH?: number;
  fechaIdTipoSangre?: Date;
  hablaEspanol_id?: number | string;
  hablaIndigena_id?: number |string;
  indigena_id?: number | string;
  migrante?: number;
  ocupacion_id?: number;
  procedencia_id?: number;
  religion_id?: string;
  tipoLenguaIndigena_id?: number;
  tipoSangre_id?: number;
  trabajaActualmente_id?: number;
  fotoPaciente?: string | null;
  tipoBeneficiario ?: string;
  tipoBeneficiario_id ?: number;
  email ?: string;

  }

  export interface shortRegisterPatient{
    nombre : string;
    primerApellido : string;
    segundoApellido : string;
    sexo_id: number;
    fechaNacimiento : Date;
    nacionalidad_id : number;
    entidadNacimiento_id : number;
    municipioNacimiento_id : number;
    curp : string;
    telCasa : string;
    telCelular : string;
    email: string;
  }

  export interface longRegisterPatient{
    nombre : string;
    primerApellido : string;
    segundoApellido : string;
    sexo_id : number;
    fechaNacimiento : Date;
    curp : string;
    desconoceCurp : number;
    nacionalidad_id : number;
    migrante: number;
    entidadNacimiento_id : number;
    municipioNacimiento_id : number;
    procedencia_id: number;
    religion_id: string;
    estadoCivil_id?: number;
    ocupacion_id?: number;
    escolaridad_id?: number;
    trabajaActualmente_id: number;
    indigena_id: number;
    tipoLenguaIndigena_id: number;
    hablaIndigena_id: number;
    hablaEspanol_id: number;
    tipoSangre: string;
    factorRH: number;
    fechaIdTipoSangre: Date;
    email ?: string;
    telCasa ?: string;
    telCelular ?: string;
    tipoBeneficiario ?: string;
    tipoBeneficiario_id ?: number;
  

  }

  export interface UnknownPatientRegister{
    noPaciente : string | number;
    noExpediente : string;
    tipoExpediente : string;
    nombre: string;
    primerApellido : string;
    segundoApellido : string;
    sexo_id : number;
    peso: number;
    talla: number;
    procedencia_id : number;
    notasPaciente : string;
    telefono : number;
    tipoTel_id : number;
  }

export interface ListaAlerta {
  alertaId?: number;
  captura?: number;
  comentario?: number;
  comentarioGuardado?: string;
  estatus?: number;
  eventoAlertaId?: number;
  fechaEliminacion?: Date;
  fechaRegistro?: Date;
  hospitalId?: number;
  icono?: string;
  interfazCaptura?: string;
  nombre?: string;
  sexoId?: number;
  usuarioEliminacion?: string;
  usuarioRegistro?: string;
}

