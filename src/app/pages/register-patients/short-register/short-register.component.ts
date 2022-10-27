/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  EventEmitter,
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
  PatientRegister,
  SexResponse,
  Pais,
  Entidad,
  Municipio,
  registerType,
} from '@interfaces';
import { CatalogosService, RegisterPatientsService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { regexOnlyLetters, regexOnlyNumbers } from '@config/regex';

@Component({
  selector: 'app-short-register',
  templateUrl: './short-register.component.html',
  styleUrls: ['./short-register.component.scss'],
})
export class ShortRegisterComponent implements OnInit, OnDestroy {
  @Output() flagCancel = new EventEmitter<boolean>();

  private subcription = new Subscription();
  //forms
  

  //select options sex
  public sexOptions!: SexResponse;
  public nationalityOptions!: Pais[];
  public entityOptions!: Entidad[];
  public muniOptions!: Municipio[];
  public shortForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogosService,
    private regPatients: RegisterPatientsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.shortForm = this.initForm();
    this.initSelects();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  public initForm():FormGroup{
    return this.fb.group({
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.required,
          Validators.pattern(regexOnlyLetters),
        ],
      ],
      pLastName: [
        '',
        [
          Validators.minLength(2),
          Validators.required,
          Validators.pattern(regexOnlyLetters),
        ],
      ],
      mLastName: ['', [Validators.pattern(regexOnlyLetters)]],
      curp: [
        '',
        {
          Validators: [Validators.required],
          asyncValidators: [this.validatorCurp()],
        },
      ],
      homeNumber: [
        '',
        [Validators.min(10), Validators.pattern(regexOnlyNumbers)],
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      email: ['', Validators.email],
      sex: ['', Validators.required],
      bornDate: ['', Validators.required],
      nationality: ['', Validators.required],
      entityBorn: [''],
      muniBorn: [''],
    });
  }
  public initSelects(): void {
    this.initSexOptions();
    this.initNatOptions();
    this.fillOtherNatOptions();
  }

  public validatorCurp(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      this.regPatients
        .checkCurp(control.value)
        .pipe(map((res) => (res ? { invalidCurp: true } : null)));
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1.2 * 1000,
    });
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
      this.catalogService
        .getNationalities()
        .subscribe((data) => (this.nationalityOptions = data))
    );
  }

  public fillOtherNatOptions(): void {
    this.subcription.add(
      this.shortForm.get('nationality')?.valueChanges.subscribe((nation) => {
        this.catalogService
          .getLocalitiesByCountryId(nation)
          .subscribe((dat) => (this.entityOptions = dat));
      })
    );

    this.subcription.add(
      this.shortForm.get('entityBorn')?.valueChanges.subscribe((ent) => {
        this.catalogService.getMunisByEntity(ent).subscribe((res) => {
          this.muniOptions = res;
        });
      })
    );
  }

  public registerShortPatient() {
    const {
      name,
      pLastName,
      mLastName,
      curp,
      homeNumber,
      mobileNumber,
      email,
      sex,
      bornDate,
      nationality,
      entityBorn,
      muniBorn,
    } = this.shortForm.value;
    

    const patient: PatientRegister = {
      nombre: name,
      primerApellido: pLastName,
      segundoApellido: mLastName,
      fechaNacimiento:bornDate,
      curp: curp,
      entidadNacimiento_id: Number(entityBorn),
      municipioNacimiento_id: Number(muniBorn),
      nacionalidad_id: Number(nationality),
      sexo_id: Number(sex),
      telCasa: homeNumber,
      telCelular: mobileNumber,
      email: email,
    };
    
    this.subcription.add(
      this.regPatients.addShortPatient(patient).subscribe((res) => {
        let action: registerType = {
          registerType: 0,
          action: 0,
        };
        this.openSnackBar('Registro exitoso', 'Ok');
        this.shortForm.reset();
        this.regPatients.registerSelected.emit(action);
      })
    );
  }

  public getErrorMessage(controlName: string, type: string) {
    return this.shortForm.controls[controlName].errors?.[type];
  }

  public cancel() {
    this.flagCancel.emit(true);
  }
}
