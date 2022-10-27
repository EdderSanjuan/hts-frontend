
/* eslint-disable @typescript-eslint/naming-convention */
export interface Response {
  estatus: number;
  informacion: Info;
  mensaje ?:string;

}

export interface Info {
  exito ?:number;
  idPaciente ?:number;
  mensaje?:string;
  cOcupacion?: COcupation[];
  cReligion?: CReligion[];
  cEscolaridad?: CEscolaridad[];
  cEstadoCivil?: CEstadoCivil[];
  cSiNo?: CSiNo[];
  cLenguaIndigena?: CLenguaIndigena[];
  cvialidades?: Cvialidade[];
  tasentamientos?: Tasentamiento[];
  localidades?: Localidad[];
  cpostales?: Cpostale[];
  pacientes?: Paciente[];
  paciente?: Paciente;
  cProcedencia?: CProcedencia[];
  cSangre?: CSangre[];
  qr?:string;
  cFactorRH?: CFactorRH[];
  domicilios?: Domicilio[];
  paises?: Pais[];
  entidades?: Entidad[];
  municipios?: Municipio[];
}


export interface COcupation {
  ocupacionId: number;
  cve: string;
  nombre: string;
  descripcion: string;
  valorDefualt: number;
  estatus: number;
  fechaRegistro: Date;
  usuarioRegistra: UsuarioRegistra;
  idiomaAppId: number;
  pacPacientes: any[];
  contactos: any[];
  id: number;
}

export interface CReligion {
  religionid: string;
  descripcion: string;
  fecharegistro: Date;
  indicadefault: number;
  estatus: number;
  nousuario: UsuarioRegistra;
}

export interface CEscolaridad {
  escolaridadId: number;
  cve: string;
  nombre: string;
  descripcion: string;
  valorDefault: number;
  estatus: number;
  fechaRegistro: Date;
  usuarioRegistra: UsuarioRegistra;
  idiomaAppId: number;
  contactos: any[];
  id: number;
}

export interface CEstadoCivil {
  estadoCivilId: number;
  cve: string;
  nombre: string;
  guiaId: number;
  idiomaAppId: number;
  pacPacientes: any[];
  contactos: any[];
  id: number;
}

export interface CSiNo {
  sinoId: number;
  cve: string;
  nombre: string;
  guiaId: number;
  idiomaAppId: number;
  id: number;
}

export interface CLenguaIndigena {
  tipoLenguaIndigenaId: number;
  cve: string;
  nombre: string;
  guiaId: number;
  idiomaAppId: number;
  id: number;
}

export interface Cvialidade {
  vialidadId:    number;
  clave:         string;
  nombre:        string;
  descripcion:   string;
  indicaDefault: number;
  estatus:       number;
  fechaRegistro: Date;
  noUsuario:     UsuarioRegistra;
  null:          boolean;
}

export interface Tasentamiento {
  tipoAsenId:    number;
  clave:         string;
  nombre:        string;
  descripcion:   string;
  indicaDefault: number;
  status:        number;
  fechaRegistro: Date;
  noUsuario:     UsuarioRegistra;
  direccions:    any[];
  null:          boolean;
}

export interface Localidad {
  catLocalidadId: number;
  cveEnt:         string;
  cveMun:         string;
  cveLoc:         string;
  descripcion:    string;
  indicaDefault:  number;
  status:         number;
  usuarioCve:     UsuarioRegistra;
  fechaRegistro:  Date;
  direccions:     any[];
  null:           boolean;
}

export interface Cpostale {
  catCodigoPostalId: number;
  nombre:            string;
  descripcion:       string;
  cve:               string;
  status:            number;
  usuarioCve:        UsuarioRegistra;
  indicaDefault:     number;
  fechaRegistro:     Date;
  direccions:        any[];
  null:              boolean;
  cestado:           string;
  cmunicipio:        string;
}


export interface Paciente {
  idPaciente?: number;
  tipoExpedienteId?: number;
  tipoExpediente?: string;
  noPaciente?: number ;
  noExpediente?: number;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  fechaNacimiento?: Date;
  fechaEstimada?: Date;
  curp?: string;
  sexoId?: number;
  fallecido?: number;
  vigencia?: string;
  convenio?: string;
  nombreConvenio?: string;
  usuarioRegistra?: string;
  nombreAseguradora?: string;
  idAseg?: number;
  idEvento?: number;
  nacionalidad?: string;
  telefono?: number;
  tipoTel?: string;
  defuncionId?: number;
  expedienteId?: number;
  hospitalId?: number;
  aseguradoraNSE?: number | string;
  duplicado?: number;
  tipoExpediente_id?: number;
  edadAparente?: number;
  fechaIdTipoSangre?: Date;
  fechaRegistro?: Date;
  nacionalidad_id?: number;
  entidadNacimiento?: string;
  entidadNacimiento_id?: number;
  entidadNacimiento_cve?: string;
  municipioNacimiento?: string;
  municipioNacimiento_id?: number;
  municipioNacimiento_cve?: string;
  peso?: number;
  talla?: number;
  sexo?: string;
  sexo_id?: number;
  religion?: string;
  religion_id?: string;
  tipoSangre?: string;
  tipoSangre_id?: number;
  procedencia?: string;
  procedencia_id?: number;
  estadoCivil?: string;
  estadoCivil_id?: number;
  escolaridad?: string;
  escolaridad_id?: number;
  indigena?: number | string;
  indigena_id?: string;
  hablaIndigena?: number | string;
  hablaIndigena_id?: number;
  hablaEspanol?: number | string;
  hablaEspanol_id?: number | string;
  trabajaActualmente?: number | string;
  trabajaActualmente_id?: number;
  tipoLenguaIndigena?: number | string;
  tipoLenguaIndigena_id?: number;
  ocupacion?: string | number;
  ocupacion_id?: number;
  servicioEspRegistro?: string;
  servicioEspRegistro_id?: string;
  datosProductoId?: number | string;
  tipoEvento?: string | number;
  migrante?: number;
  factorRH?: number;
  hospital?: string;
  paciente?: string;
  calle?: string;
  colonia?: string;
  municipio?: string;
  desconoceCurp?: number;
  confirmarCronico?: number;
  fotoPaciente?: string;
  listaAlertas?: any[];
  telCasa ?: string | number;
  telCelular ?: string | number;
  correo ?: string;
  tipoBeneficiario_id ?: string | number;

}

export interface CProcedencia {
  procedenciaId?:   number;
  cve?:             string;
  nombre?:          string;
  descripcion?:     string;
  valorDefault?:    number;
  estatus?:         number;
  fechaRegistro?:   Date;
  usuarioRegistra?: string;
  idiomaAppId?:     number;
  pacPacientes?:    any[];
  id?:              number;
}

export interface CSangre {
  tipoSangreId?:    number;
  cve?:             string;
  nombre?:          string;
  descripcion?:     string;
  valorDefault?:    number;
  estatus?:         number;
  fechaRegistro?:   Date;
  usuarioRegistra?: string;
  idiomaAppId?:     number;
  pacPacientes?:    any[];
  id?:              number;
}

export interface CFactorRH {
  idFactorRH?:  number;
  cveFactorRH?: string;
  descripcion?: string;
}

export interface Domicilio {

  direccionId?:            number;
  calle?:                  null | string;
  noExt?:                  string;
  noExtLetra?:             string;
  noInt?:                  null | string;
  noIntLetra?:             string;
  nombreVialidad?:         string;
  nombreAsentamiento?:     string;
  municipioId?:            number;
  localidadId?:            number;
  codigoPostalId?:         number;
  vialidadId?:             number;
  tipoAsenId?:             number;
  status?:                 boolean;
  fechaRegistro?:          Date;
  cve?:                    string;
  cveEnt?:                 string;
  cveMun?:                 string;
  entidadId?:              number;
  entidadCve?:             string;
  isDomicilioAlternativo : boolean | null;
}

export interface Pais {
  paisId?:            number;
  cve?:               string;
  descripcion?:       string;
  codOficial?:        string;
  indicaDefault?:     number;
  status?:            number;
  usuarioCve?:        UsuarioRegistra;
  fechaRegistro?:     Date;
  direccions?:        any[];
  nomCatEntidadeses?: any[];
  null?:              boolean;
}

export interface Entidad {
  catEntidadesId?: number;
  nomCatPaises?:   null;
  cve?:            string;
  descripcion?:    string;
  nombre?:         string;
  indicaDefault?:  number;
  status?:         number;
  usuarioCve?:     UsuarioRegistra;
  fechaRegistro?:  Date;
  direccions?:     any[];
  id?:             number;
  null?:           boolean;
}

export interface Municipio {
  catMunicipioId?: number;
  cveEnt?:         string;
  cveMun?:         string;
  descripcion?:    string;
  indicaDefault?:  number;
  status?:         number;
  usuarioCve?:     UsuarioRegistra;
  fechaRegistro?:  Date;
  direccions?:     any[];
  id?:             number;
  null?:           boolean;
}
export enum UsuarioRegistra {
  Sistemas = 'SISTEMAS',
  Sasa = "*SASA"
}
