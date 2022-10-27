export interface activePatient{
    idPatient : number;
    patientNumber ?: string;
    expedient ?: string;
    expedientType ?: string;
    actualAction ?: number; // 1 registration - 2 update
}