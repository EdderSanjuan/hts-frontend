export interface BeneficiaryResponse {
    estatus:     number;
    mensaje:     string;
    informacion: Inform;
}

export interface Inform{
    cTipoBeneficiario: CTipoBeneficiario[];
}

export interface CTipoBeneficiario {
    id:            number;
    name:          string;
    idOpcion:      null;
    descripcion:   null;
    estatusOpcion: number;
    normativa:     number;
    indicaDefault: null;
    idCatPostal:   null;
    jur:           null;
    nombreOpcion:  null;
}
