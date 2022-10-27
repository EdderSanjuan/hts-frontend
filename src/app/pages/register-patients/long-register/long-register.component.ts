/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  SexResponse,
  Response,
  PatientRegister,
  activePatient,
  qrInfo,
  Pais,
  Entidad,
  Municipio,
  CTipoBeneficiario
} from '@interfaces';
import { CatalogosService, RegisterPatientsService } from '@services';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QrComponent } from '../qr/qr.component';
import { map } from 'rxjs/operators';
import { regexOnlyLetters } from '@config/regex';
import * as moment from 'moment';
import DocumentGenerator from 'src/app/shared/models/DocumentGenerator';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-long-register',
  templateUrl: './long-register.component.html',
  styleUrls: ['./long-register.component.scss'],
})
export class LongRegisterComponent implements OnInit, OnDestroy {
  @Input() updateFlag!: boolean;
  public activePatient!: activePatient;
  @Input() qrPatient!: qrInfo;
  @Output() flagCancel = new EventEmitter<boolean>();
  public profileImage!: string;

  private subcription = new Subscription();

  //form
  longForm !: FormGroup;
  sexOptions!: SexResponse;
  nationalityOp!: Pais[];
  entityOptions!: Entidad[];
  muniOptions!: Municipio[];
  beneficiaryOptions !: CTipoBeneficiario[];
  religionOptions!: Response;
  ocupationOptions!: Response;
  escolarityOptions!: Response;
  civilOptions!: Response;
  YesNotOptions!: Response;
  indigLanguageOptions!: Response;

  public startDate: Date = new Date(1990, 0, 1);
  public migrant: number = 0;
  public unknowCurp: number = 0;
  public disabledCurp: boolean = false;
  public calculatedAge: number = 0;
  public age: string = "";
  public showAge: Boolean = false;
  public entity : string = "";
  public read : boolean = true;
  public curpValue : string = "";

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogosService,
    private registerP: RegisterPatientsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.longForm = this.initForm();
    this.initSelects();
    

    if (this.updateFlag) {
      this.registerP.patientActive.subscribe((pat) => {
        this.activePatient = pat;
        this.updateFields(pat.idPatient);
      });
    }   
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  public initForm():FormGroup{
    return this.fb.group({
      patNumber: [''],
      patExpedient: [''],
      patExpedientType: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(regexOnlyLetters),
        ],
      ],
      pLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(regexOnlyLetters),
        ],
      ],
      mLastName: ['', [Validators.pattern(regexOnlyLetters)]],
      sex: ['', Validators.required],
      beneficiaryType: ['',[Validators.required]],
      homeNumber: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      bornDate: ['', [Validators.required]],
      curp: [
        '',
        {
          asyncValidators: [this.validatorCurp()],
        },
      ],
      updateCurp: [''],
      nationality: ['', [Validators.required]],
      entityBorn: ['', [Validators.required]],
      muniBorn: [''],
      religion: [''],
      civilState: [''],
      ocupation: [''],
      escolarity: [''],
      workQ: [''],
      indig: [''],
      indigLanguage: [''],
      typeLanguage: [''],
      speakEs: [''],
    });
  }
  public getImageProfile(event: string): void {
    this.profileImage = event;
  }

  public validatorCurp(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      this.registerP
        .checkCurp(control.value)
        .pipe(map((res) => (res ? { invalidCurp: true } : null)));
  }

  public updateFields(idPatient: number): void {
    if (idPatient) {
      this.registerP.updatePatientInfo(idPatient).subscribe((res) => {
        if (res.fotoPaciente) {
          this.profileImage = res.fotoPaciente!;
        }
      
        const auxDate = new Date(res.fechaNacimiento!)
        this.longForm.patchValue({
          patNumber: res.noPaciente,
          patExpedient: res.noExpediente,
          patExpedientType: res.tipoExpediente,
          name: res.nombre,
          pLastName: res.primerApellido,
          mLastName: res.segundoApellido,
          sex: res.sexo_id?.toString(),
          bornDate: new Date(auxDate.setMinutes(auxDate.getMinutes() + auxDate.getTimezoneOffset())),
          updateCurp: res.curp,
          nationality: '229',
          entityBorn: res.entidadNacimiento_cve?.toString(),
          religion: res.religion_id,
          civilState: res.estadoCivil_id?.toString(),
          ocupation: res.ocupacion_id?.toString(),
          escolarity: res.escolaridad_id?.toString(),
          workQ: res.trabajaActualmente_id?.toString(),
          indig: res.indigena_id?.toString(),
          indigLanguage: res.hablaIndigena_id?.toString(),
          typeLanguage: res.tipoLenguaIndigena_id?.toString(),
          speakEs: res.hablaEspanol_id?.toString(),
          muniBorn: res.municipioNacimiento_id?.toString(),
          homeNumber : res.telCasa,
          phoneNumber : res.telCelular,
          email : res.correo,
          beneficiaryType : res.tipoBeneficiario_id?.toString()
          
        });
      });
    }
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1.2 * 1000,
    });
  }

  public registerPatient() {
    const {
      name,
      pLastName,
      mLastName,
      sex,
      bornDate,
      curp,
      updateCurp,
      nationality,
      entityBorn,
      muniBorn,
      religion,
      civilState,
      ocupation,
      escolarity,
      workQ,
      indig,
      indigLanguage,
      speakEs,
      typeLanguage,
      email,
      homeNumber,
      phoneNumber,
      beneficiaryType
    } = this.longForm.value;

    let patient!: PatientRegister;
    let idp: number = 0;
    let base64Image!: string | null;

    if (this.updateFlag) {
      idp = this.activePatient.idPatient;
    }

    if (this.profileImage) {
      base64Image = this.profileImage;
    } else {
      base64Image = null;
    }

    if (this.updateFlag) {
      patient = {
        idPaciente: Number(idp),
        nombre: name,
        primerApellido: pLastName,
        segundoApellido: mLastName,
        fechaNacimiento: bornDate,
        curp: updateCurp,
        desconoceCurp: this.unknowCurp,
        ocupacion_id: ocupation,
        estadoCivil_id: civilState,
        escolaridad_id: escolarity,
        nacionalidad_id: nationality,
        entidadNacimiento_id: entityBorn,
        municipioNacimiento_id: muniBorn,
        sexo_id: sex,
        religion_id: religion,
        indigena_id: indig,
        hablaIndigena_id: indigLanguage,
        hablaEspanol_id: speakEs,
        trabajaActualmente_id: workQ,
        tipoLenguaIndigena_id: typeLanguage,
        migrante: this.migrant,
        fotoPaciente: base64Image,
        telCasa : homeNumber,
        telCelular : phoneNumber,
        email : email,
        tipoBeneficiario_id: beneficiaryType
        
      };
    } else {
      patient = {
        idPaciente: null,
        nombre: name,
        primerApellido: pLastName,
        segundoApellido: mLastName,
        fechaNacimiento: bornDate,
        curp: curp,
        desconoceCurp: this.unknowCurp,
        ocupacion_id: ocupation,
        estadoCivil_id: civilState,
        escolaridad_id: escolarity,
        nacionalidad_id: nationality,
        entidadNacimiento_id: entityBorn,
        municipioNacimiento_id: muniBorn,
        sexo_id: sex,
        religion_id: religion,
        indigena_id: indig,
        hablaIndigena_id: indigLanguage,
        hablaEspanol_id: speakEs,
        trabajaActualmente_id: workQ,
        tipoLenguaIndigena_id: typeLanguage,
        migrante: this.migrant,
        fotoPaciente: base64Image,
        telCasa : homeNumber,
        telCelular : phoneNumber,
        email : email,
        tipoBeneficiario_id: beneficiaryType
      };
    }
 
    if (this.updateFlag) {
      this.subcription.add(
        this.registerP.addPatient(patient, 2).subscribe((res) => {
          this.registerP.nextStep.emit(1);
          this.openSnackBar('Actualizacion exitosa', 'Ok');
        })
      );

    } else {
    
      this.subcription.add(
        this.registerP.addPatient(patient).subscribe((res) => {
          this.registerP.nextStep.emit(1);
          this.openSnackBar('Registro exitoso', 'Ok');
        })
      );
 
    }
  }

  public initSelects(): void {
    this.initSexOptions();
    this.initNatOptions();
    this.initReligionOptions();
    this.initOcupationOptions();
    this.initEscolarOptions();
    this.initCivilOptions();
    this.initYesNotOptions();
    this.initLanguageOptions();
    this.initBeneficiaryOptions();
  }

  public addEvent(event: MatDatepickerInputEvent<Date>) {
    const toDay = moment(new Date());
   
    if(this.read === false){
      console.log('entro');
      this.generateCurp(this.entity);
    }
 
    const selectedDate: any = event.value;
    const date  = moment(new Date(selectedDate));
    const duration = moment.duration(toDay.diff(date));
    this.calculatedAge = duration.years();
    this.age = `${duration.years()} años, ${duration.months()} meses, ${duration.days()} dias`;
    this.showAge = true;
  }

  public checkMigrante(event: any) {
    if (event.checked) {
      this.migrant = 1;
    }
  }

  public checkCurp(event: any) {
    if (event.checked) {
      this.disabledCurp = true;
      this.unknowCurp = 1;
    } else {
      this.disabledCurp = false;
      this.unknowCurp = 0;
    }
  }

  public initSexOptions(): void {
    this.subcription.add(
      this.catalogService
        .getSexList()
        .subscribe((res) => (this.sexOptions = res))
    );
  }

  public initNatOptions(): void {
    this.subcription.add(
      this.catalogService.getNationalities().subscribe((data) => {
        this.nationalityOp = data;
      })
    );

    this.fillOtherNatOptions();
  }

  public fillOtherNatOptions(): void {
    this.subcription.add(
      this.longForm.get('nationality')?.valueChanges.subscribe((nation) => {
        this.catalogService
          .getLocalitiesByCountryId(nation)
          .subscribe((dat) => (this.entityOptions = dat));
      })
    );

    this.subcription.add(
      this.longForm
        .get('entityBorn')
        ?.valueChanges.subscribe((ent) =>{
          const data = ent.split('-');
          this.catalogService
            .getMunisByEntity(data[0])
            .subscribe((res) => (this.muniOptions = res))
          }
        )
    );
  }

  public initReligionOptions(): void {
    this.subcription.add(
      this.catalogService
        .getReligionList()
        .subscribe((dat) => (this.religionOptions = dat))
    );
  }

  public initOcupationOptions(): void {
    this.subcription.add(
      this.catalogService.getOcupationList().subscribe((data) => {
        this.ocupationOptions = data;
      })
    );
  }

  public initEscolarOptions(): void {
    this.subcription.add(
      this.catalogService
        .getEscolarityLevel()
        .subscribe((data) => (this.escolarityOptions = data))
    );
  }

  public initCivilOptions(): void {
    this.subcription.add(
      this.catalogService
        .getCivilState()
        .subscribe((data) => (this.civilOptions = data))
    );
  }

  public initYesNotOptions(): void {
    this.subcription.add(
      this.catalogService
        .getTypeOfYesNot()
        .subscribe((data) => (this.YesNotOptions = data))
    );
  }

  public initLanguageOptions(): void {
    this.subcription.add(
      this.catalogService
        .getTypeOfLanguage()
        .subscribe((data) => (this.indigLanguageOptions = data))
    );
  }

  public initBeneficiaryOptions():void{
    this.subcription.add(
      this.catalogService.getBeneficiaryType().subscribe((res) => this.beneficiaryOptions = res )
    );
  }

  public getErrorMessage(controlName: string, type: string) {
    return this.longForm.controls[controlName].errors?.[type];
  }

  public cancel(): void {
    this.flagCancel.emit(true);
    this.longForm.reset();
  }
 
  public openDialog(): void {

    if (this.activePatient) {
      const dialogRef = this.dialog.open(QrComponent, {
        width: '650px',
        data: this.qrPatient,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          console.log('imprimiendo . . .');
        }
      });
    }
  }

  public entityChange(event : MatSelectChange):void{
    this.entity = event.value.split('-')[1];
    this.generateCurp(this.entity);

  }

  public generateCurp(entity : string):void{

    const {name,pLastName,mLastName,bornDate,sex} = this.longForm.value;
    const date : Date = new Date(bornDate);
    const sexString = sex === 1 ? "F" : sex === 2 ? "M" : "M";
    const separateDate: string[] = date.toLocaleDateString('es-ES').split('/');
    const aux = separateDate[1];
    let month = "";
    if(aux.length == 1){
      month = "0"+aux;
    }
    this.curpValue = DocumentGenerator.getCURP(name,pLastName,mLastName,separateDate[0],month,separateDate[2],entity,sexString);

    this.longForm.patchValue({
      curp: this.curpValue
    })

    this.read = false;

  }
}
