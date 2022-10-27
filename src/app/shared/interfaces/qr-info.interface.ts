export interface qrInfo{
    name : string;
    pLastName : string;
    mLastName : string;
    sex : string;
    expedientNumber : string | number;
    bornDate : Date;
    registrationDate : Date;
    calculateDate ?: string;
    qr ?: string;
}