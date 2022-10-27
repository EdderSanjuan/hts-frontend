export interface AddressRegister {
    agenteDireccionId: null | number;
    agenteId:          number;
    direccion:         Direccion;
}

export interface Direccion {
    direccionId:        number|null;
    calle:              string;
    nomCatEntidades:    NomCatEntidades;
    nomCatMunicipio:    NomCatMunicipio;
    nomCatLocalidad:    NomCatLocalidad;
    nomCatCodigoPostal: NomCatCodigoPostal;
    catTipoAsen:        CatTipoAsen;
    catVialidad:        CatVialidad;
    noExt:              string;
    noExtLetra:         string;
    noInt:              string;
    noIntLetra:         string;
    nombreAsentamiento: string;
    nombreVialidad:     string;
    cve:                string;
    nomCatPaises:       NomCatPaises;
}

export interface CatTipoAsen {
    tipoAsenId: number;
}

export interface CatVialidad {
    vialidadId: number;
}

export interface NomCatCodigoPostal {
    catCodigoPostalId: number;
}

export interface NomCatEntidades {
    catEntidadesId: number;
}

export interface NomCatLocalidad {
    catLocalidadId: number;
}

export interface NomCatMunicipio {
    catMunicipioId: number;
}

export interface NomCatPaises {
    paisId: number;
}
