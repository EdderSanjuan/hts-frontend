export interface SexResponse {
  estatus: number;
  mensaje: string;
  informacion: Informacion;
}

export interface Informacion {
  cSexo: CSexo[];
}

export interface CSexo {
  sexoId: number;
  descripcion: string;
  sexo: string;
  fechaRegistro: Date;
  indicaDefault: number;
  estatus: number;
  noUsuario: string;
}
