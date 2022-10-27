import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CurrentAddressComponent } from './current-address/current-address.component';
import { Subscription} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterPatientsService } from '@services';
import { Domicilio } from '@interfaces';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.scss'],
})
export class ResidenceComponent implements OnDestroy,OnInit{
  
  private subscription =  new Subscription();
  @ViewChild('actual') actual !: CurrentAddressComponent; 
  @ViewChild('alternativo') alter !: CurrentAddressComponent;
  updateFlag : boolean = false;
  upActualAddress !: Domicilio;
  upAlterAddress !: Domicilio;

  constructor(private registerP : RegisterPatientsService,private _snackBar: MatSnackBar){
    
  }
  ngOnInit(): void {

    this.subscription.add(
      this.registerP.patientActive.subscribe(res => {
        if(res.actualAction == 2){
          this.updateFlag = true;
          this.registerP.getAddressInfo(res.idPatient).subscribe(data => this.getUpdateAddress(data))
          
        }
      })
      
    )
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getUpdateAddress(addressList : Domicilio[]):void{

    let actual = addressList.find((address) => address.isDomicilioAlternativo === false)!;
    let alter = addressList.find((address) => address.isDomicilioAlternativo === true )!;

    if(actual != undefined){
      
      this.upActualAddress = actual;
      this.fillActualAddress(1);
    }
    if(alter != undefined){
      
      this.upAlterAddress = alter;
      this.fillActualAddress(2);
    }

  }

  public fillActualAddress(address: number):void{
    
    if(address === 1){

      const {
        vialidadId,nombreVialidad,noExt,
        noExtLetra,noInt, noIntLetra,
        codigoPostalId,nombreAsentamiento,
        tipoAsenId,entidadId,entidadCve,
        municipioId,cveEnt,cveMun,localidadId
      } = this.upActualAddress;

      this.actual.addressForm.patchValue({
        viaType: vialidadId?.toString(),
        viaName: nombreVialidad,
        extNumber : noExt,
        extLetter: noExtLetra,
        intNumber:noInt,
        intLetter: noIntLetra,
        townShip: nombreAsentamiento,
        townShipType: tipoAsenId?.toString(),
        postalCode:codigoPostalId?.toString(),
        country: "229",
        state: `${entidadId}-${entidadCve}`,
        municipality:`${municipioId}-${cveEnt}-${cveMun}`,
        locality: `${localidadId}-${cveEnt}-${cveMun}`
   
      })

      

    }

    else{

      const {
        vialidadId,nombreVialidad,noExt,
        noExtLetra,noInt, noIntLetra,
        codigoPostalId,nombreAsentamiento,
        tipoAsenId,entidadId,entidadCve,
        municipioId,cveEnt,cveMun,localidadId
      } = this.upAlterAddress;
  
      this.alter.addressForm.patchValue({
        viaType: vialidadId?.toString(),
        viaName: nombreVialidad,
        extNumber : noExt,
        extLetter: noExtLetra,
        intNumber:noInt,
        intLetter: noIntLetra,
        townShip: nombreAsentamiento,
        townShipType: tipoAsenId?.toString(),
        postalCode:codigoPostalId?.toString(),
        country: "229",
        state: `${entidadId}-${entidadCve}`,
        municipality:`${municipioId}-${cveEnt}-${cveMun}`,
        locality: `${localidadId}-${cveEnt}-${cveMun}`
   
      })

    }
  
  }


  public openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 1.2 * 1000
    });
  }

  public addAdresses():void{
    if(this.updateFlag){
      //check if exist an id , because if not exits, that means that the
      //process is like a register direction , no update
      if(this.upActualAddress){
        this.actual.getDataAddress(this.upActualAddress.direccionId);
      }
      else{
        this.actual.getDataAddress();
      }
      
    }
    else{
      this.actual.getDataAddress();
    }
    
    
    this.subscription.add(
      this.registerP.addCurrentAddress(this.actual.getBody()).subscribe((res) => {
        
        this.openSnackBar("Registro exitoso", "Ok");
        

      })
      )
    

    if(!this.alter.isInvalid()){
      
      if(this.updateFlag){
        
        if(this.upAlterAddress){
          this.alter.getDataAddress(this.upAlterAddress.direccionId);
        }
        else{
          this.alter.getDataAddress();
        }
        
      }
      else{
        this.alter.getDataAddress();

      }
      
      this.subscription.add(
        this.registerP.addAlternateAddress(this.alter.getBody()).subscribe((res) => {
          this.openSnackBar("Registro alternativo exitoso", "Ok");
          
        })
      ) 
    }
  }

}
