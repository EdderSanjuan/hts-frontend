import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexOnlyLetters } from '@config/regex';
import { Paciente, registerType, Response } from '@interfaces';
import { RegisterPatientsService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-names-form',
  templateUrl: './names-form.component.html',
  styleUrls: ['./names-form.component.scss'],
})
export class NamesFormComponent implements OnDestroy {
  @Output() searchValue = new EventEmitter<Paciente[]>();
  @Output() resetNames = new EventEmitter<boolean>();

  private subcription = new Subscription();

  namesForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(regexOnlyLetters)]],
    paterno: ['', [Validators.required, Validators.pattern(regexOnlyLetters)]],
    materno: ['', [Validators.pattern(regexOnlyLetters)]],
  });

  constructor(
    private fb: FormBuilder,
    private registerP: RegisterPatientsService
  ) {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
  public buscarNombres() {
    const { nombre, paterno, materno } = this.namesForm.value;
    let reg: registerType = {
      registerType: 0,
      action: 2,
    };
    this.registerP.registerSelected.emit(reg);

    const p: Paciente = {
      nombre: nombre,
      primerApellido: paterno,
      segundoApellido: materno,
      nombreAseguradora: '',
    };

    this.subcription.add(
      this.registerP.searchPatientByName(p).subscribe((res) => {
        this.searchValue.emit(res.informacion.pacientes);
      })
    );
  }

  public getErrorMessage(controlName: string, type: string) {
    return this.namesForm.controls[controlName].errors?.[type];
  }

  public resetForm() {
    this.namesForm.reset();
    this.resetNames.emit(true);
  }
}
