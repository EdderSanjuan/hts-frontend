import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BeneficiaryResponse, SexResponse, Response, CFactorRH, Pais, Entidad, Municipio, CTipoBeneficiario } from '@interfaces';


@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  constructor(private http: HttpClient) {}

  public getNationalities(): Observable<Pais[]> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaPaises`,
      null
    ).pipe(
      map(res => {
        return res.informacion.paises!;
      })
    )
  }

  public getSexList(): Observable<SexResponse> {
    return this.http.post<SexResponse>(
      `${environment.SERVER_URL}/catalogo/listaSexoResumen`,
      null
    );
  }

  public getLocalitiesByCountryId(
    idCountry: number
  ): Observable<Entidad[]> {
    const body = { paisId: idCountry };
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaEntidadesByPaisID`,
      body
    ).pipe(
      map(res => {
        return res.informacion.entidades!;
      })
    )
  }

  public getMunisByEntity(idEntity: string): Observable<Municipio[]> {
    const body = { cve: idEntity };
    
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaMunicipiosByCveEntidad`,
      body
    ).pipe(
      map(res => {
        return res.informacion.municipios!;
      })
    )
  }

  public getLocalitiesByCveEntMun(cveEnt : string , cveMun : string):Observable<Response>{
    const body = { cveEnt , cveMun };
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaLocalidadesByCveEntMun`,body)
  }

  public getReligionList(): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaReligion`,
      null
    );
  }

  public getOcupationList(): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaOcupacion`,
      null
    );
  }

  public getEscolarityLevel(): Observable<Response> {
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaNivelEscolaridad`,
      null
    );
  }

  public getCivilState(): Observable<Response> {
    const body = { idiomaAppId: 1 };
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaEstadoCivil`,
      body
    );
  }

  public getTypeOfLanguage(): Observable<Response> {
    const body = { idiomaAppId: 1 };
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaTipoLenguaIndigena`,
      body
    );
  }

  public getTypeOfYesNot(): Observable<Response> {
    const body = { idiomaAppId: 1 };
    return this.http.post<Response>(
      `${environment.SERVER_URL}/catalogo/listaSiNo`,
      body
    );
  }

  public getVialityList():Observable<Response>{
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaVialidad`,null);
  }

  public getTownShipList():Observable<Response>{
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaTipoAsentamiento`,null);
  }

  public getCpListbyMun(cveEnt : string , cveMun: string ): Observable<Response>{
    const body = {cveEnt , cveMun}
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaCodPostalByCveEntMun`,body);
  } 

  public getPrecedencyList(): Observable<Response>{
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaProcedencia`,null);
  }
  public getBloodTypeList(): Observable<Response>{
    return this.http.post<Response>(`${environment.SERVER_URL}/catalogo/listaTipoSangre`,null);
  }
  public rhFactorList():Observable<CFactorRH[]>{
    return this.http.get<Response>(`${environment.SERVER_URL}/catalogo/listaFactorRh`)
            .pipe(
              map((res) => {
                return res.informacion.cFactorRH!
              })
            )
  }

  public getBeneficiaryType():Observable<CTipoBeneficiario[]>{
    return this.http.post<BeneficiaryResponse>(`${environment.SERVER_URL}/catalogo/listaTipoBeneficiario`,null).pipe(
      map(res => {return res.informacion.cTipoBeneficiario})
      
    )
  }

 
}
