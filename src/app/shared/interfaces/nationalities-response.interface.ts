export interface NationalitiesResponse {
  estatus: number;
  mensaje: string;
  informacion: Information;
}

export interface Information {
  paises?: Array<Array<number | string>>;
  entidades?: Array<Array<number | string>>;
  municipios?: Array<Array<number | string>>;
}
