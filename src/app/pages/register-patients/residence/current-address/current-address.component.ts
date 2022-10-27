import { Component, Input, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService, RegisterPatientsService } from '@services';
import { activePatient, AddressRegister, NationalitiesResponse, Response, Pais, Entidad, Municipio} from '@interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-address',
  templateUrl: './current-address.component.html',
  styleUrls: ['./current-address.component.scss'],
})
export class CurrentAddressComponent implements OnInit,OnDestroy{
  private subscription = new Subscription();
  //for update
  idPatient : number = 0;

  @Input() title!: string;
  //form
  addressForm: FormGroup = this.fb.group({
    viaType: ['',[Validators.required]],
    viaName: ['', [Validators.required]],
    extNumber: ['', [Validators.required]],
    extLetter: ['',[Validators.maxLength(1)]],
    intNumber: [''],
    intLetter: ['',[Validators.maxLength(1)]],
    townShipType: ['',[Validators.required]],
    townShip: [''],
    country: ['',[Validators.required]],
    state: ['',Validators.required],
    municipality: ['',[Validators.required]],
    locality: ['',[Validators.required]],
    postalCode: ['',[Validators.required]],
  });

  //selects
  vialityOptions !: Response;
  townShipOptions !: Response;
  countryOptions !: Pais[];
  entityOptions !: Entidad[];
  muniOptions !: Municipio[];
  localityOptions !: Response;
  postalCodeOptions !: Response;
  //bodyResponse
  body !: AddressRegister;
  //to uppercase
  inputValue : string = "";
  constructor(private fb: FormBuilder,
              private catalogService : CatalogosService, 
              private registerP : RegisterPatientsService,
              private _snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.initSelects();
    this.registerP.patientActive.subscribe((patient) => {
      this.idPatient = patient.idPatient
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  public openSnackBar(message: string, action: string) {
   
    this._snackBar.open(message, action,{
      duration:1.2*1000
    });
  }

  public initSelects():void{
    this.initvialityOptions();
    this.initTownShipOptions();
    this.initCountryOptions();
  }

  public initvialityOptions():void{
    this.subscription.add(
    this.catalogService.getVialityList().subscribe( (data) => this.vialityOptions = data)
    );
  }
  public initTownShipOptions():void{
    this.subscription.add(
    this.catalogService.getTownShipList().subscribe((data) => this.townShipOptions = data)
    );
  }

  public initCountryOptions():void{
    this.subscription.add(
    this.catalogService.getNationalities().subscribe((data) => this.countryOptions = data)
    );
    this.fillOtherNatOptions();

  }

  public fillOtherNatOptions(): void {
    this.subscription.add(
    this.addressForm.get('country')?.valueChanges.subscribe((nation) => {
      
      this.catalogService
        .getLocalitiesByCountryId(nation)
        .subscribe((dat) => (this.entityOptions = dat));
    })
    );
    
    this.subscription.add(
    this.addressForm
      .get('state')
      ?.valueChanges.subscribe((ent) => 
        {
          if(ent){
            const datasplit = ent.split('-');
            this.catalogService
              .getMunisByEntity(datasplit[1])
              .subscribe((res) => this.muniOptions = res)
          }
          

          

        }
        
      )
    );
    
    this.subscription.add(
    this.addressForm
       .get('municipality')?.valueChanges.subscribe((m) => {
         if (m) {
           const data = m.split('-');

           this.catalogService.getLocalitiesByCveEntMun(data[1], data[2]).subscribe(res => {
           
             this.localityOptions = res
           });
         }

       })
    );

    this.subscription.add(
    this.addressForm.get('locality')?.valueChanges.subscribe( l => {

      if (l) {
        const lsplit = l.split('-');

        this.catalogService.getCpListbyMun(lsplit[1], lsplit[2]).subscribe(res => this.postalCodeOptions = res);
      }

    })
    );

}

public getErrorMessage(controlName: string, type : string){
  return this.addressForm.controls[controlName].errors?.[type]
}

public getBody():AddressRegister{
  return this.body;
}

public isInvalid():boolean{
  return this.addressForm.invalid;
}
public getDataAddress(addresId ?: number){
  
  let idState = this.addressForm.get('state')?.value.split('-')[0];
  let idMuni = this.addressForm.get('municipality')?.value.split('-')[0];
  let idLocality = this.addressForm.get('locality')?.value.split('-')[0];


  const {viaType,viaName,extNumber,extLetter,intNumber,intLetter,townShipType,townShip,country,postalCode} = this.addressForm.value;

  if(addresId){

    this.body = {
      agenteDireccionId:null,
      agenteId:this.idPatient,
      direccion: {
        direccionId:Number(addresId),
        calle:viaName,
        nomCatEntidades:{
          catEntidadesId:idState,
        },
        nomCatMunicipio:{
          catMunicipioId:idMuni
        },
        nomCatLocalidad:{
          catLocalidadId:idLocality
        },
        nomCatCodigoPostal:{
          catCodigoPostalId: postalCode
        },
        catTipoAsen:{
          tipoAsenId:townShipType
        },
        catVialidad:{
          vialidadId:viaType
        },
        noExt:extNumber,
        noExtLetra:extLetter,
        noInt:intNumber,
        noIntLetra:intLetter,
        nombreAsentamiento:townShip,
        nombreVialidad:viaName,
        cve:"string",
        nomCatPaises:{
          paisId:country
        }
      }
    }

  }

  else{
    this.body = {
      agenteDireccionId:null,
      agenteId:this.idPatient,
      direccion: {
        direccionId:null,
        calle:viaName,
        nomCatEntidades:{
          catEntidadesId:idState,
        },
        nomCatMunicipio:{
          catMunicipioId:idMuni
        },
        nomCatLocalidad:{
          catLocalidadId:idLocality
        },
        nomCatCodigoPostal:{
          catCodigoPostalId: postalCode
        },
        catTipoAsen:{
          tipoAsenId:townShipType
        },
        catVialidad:{
          vialidadId:viaType
        },
        noExt:extNumber,
        noExtLetra:extLetter,
        noInt:intNumber,
        noIntLetra:intLetter,
        nombreAsentamiento:townShip,
        nombreVialidad:viaName,
        cve:"string",
        nomCatPaises:{
          paisId:country
        }
      }
    }
  }
  
}

}
