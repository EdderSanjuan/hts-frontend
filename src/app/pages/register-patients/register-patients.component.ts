import { Component, OnDestroy, OnInit } from '@angular/core';
import { activePatient, qrInfo } from '@interfaces';
import { RegisterPatientsService } from '@services';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-register-patients',
  templateUrl: './register-patients.component.html',
  styleUrls: ['./register-patients.component.scss'],
})
export class RegisterPatientsComponent implements OnInit, OnDestroy {
  public registerType: number = 0;
  public updateOption : boolean = false;


  public updatePatient !: activePatient;
  public qr !: qrInfo;
  public step : number  = 0;
  private subcription = new Subscription();

  constructor(
    private readonly registerPatientsService: RegisterPatientsService
  ) {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnInit(): void {
    this.registerPatientsService.nextStep.subscribe(res => this.step = res );
    this.subcription.add(
      this.registerPatientsService.registerSelected.subscribe(
        (data) => {
          this.registerType = data.registerType;

          if(data.action !=  1){
            this.updateOption = true;
            this.registerPatientsService.patientActive.subscribe((patient) => {

              this.updatePatient = patient;
              this.getQrPatient();
            })
          
          }
          else{
            this.updateOption = false;
          }
          
        }
      )
    );
  }



  public cancel(event : boolean){
    if(event){
      this.registerType = 0;   
    }
    
  }

  public calculateAge(bornDate : Date):string{
    const today = moment( new Date() );
    const momentBorn = moment(bornDate);
    const duration = moment.duration( today.diff(momentBorn) );
    return `${duration.years()} años, ${duration.months()} meses, ${duration.days()} dias`;

  }

  public getQrPatient():void{
    
    if(this.updatePatient != undefined){
      this.subcription.add(
        this.registerPatientsService.getQrInfo(this.updatePatient.idPatient).subscribe(res =>{
          this.registerPatientsService.getQrByIdPatient(this.updatePatient.idPatient).subscribe(qr =>{
         
            this.qr = {
              name : res?.nombre!,
              pLastName: res?.primerApellido!,
              mLastName: res?.segundoApellido!,
              sex : res?.sexo!,
              expedientNumber : res?.noExpediente!,
              bornDate : res?.fechaNacimiento!,
              registrationDate: res?.fechaRegistro!,
              qr:qr,
              calculateDate : this.calculateAge(res?.fechaNacimiento!)
  
            };
            
          } )  
        }) 
      )

    }
    

  }
}
