import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente, registerType } from '@interfaces';
import { RegisterPatientsService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expedient-form',
  templateUrl: './expedient-form.component.html',
  styleUrls: ['./expedient-form.component.scss'],
})
export class ExpedienteFormComponent implements OnDestroy {
  @Output() expValue = new EventEmitter<Paciente[]>();
  @Output() resetExp = new EventEmitter<boolean>();
  private subcription = new Subscription();
  
  expForm: FormGroup = this.fb.group({
    exp: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private registerP : RegisterPatientsService) {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
  public buscarExpediente() {
    const { exp } = this.expForm.value;
    let reg : registerType = {
      registerType: 0,
      action:2
    };
    this.registerP.registerSelected.emit(reg);
    this.subcription.add(
    this.registerP.searchPatientByExp(exp).subscribe( res => res.estatus === 1 ? this.expValue.emit([res.informacion.paciente!]): this.expValue.emit([]))
    );
    
  }

  public resetForm() {
    this.expForm.reset();
    this.resetExp.emit(true);
  }
}
