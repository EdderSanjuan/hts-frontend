import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente, registerType } from '@interfaces';
import { RegisterPatientsService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-curp-form',
  templateUrl: './curp-form.component.html',
  styleUrls: ['./curp-form.component.scss'],
})
export class CurpFormComponent implements OnDestroy {
  
  @Output() curpValue = new EventEmitter<Paciente[]>();
  @Output() resetCurp = new EventEmitter<Boolean>();

  private subcription = new Subscription();

  curpForm: FormGroup = this.fb.group({
    curp: ['', Validators.required],
  });
  constructor(private fb: FormBuilder , private registerP : RegisterPatientsService) {}
  
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
  public buscarCurp() {
    let reg : registerType = {
      registerType: 0,
      action:2
    };
    this.registerP.registerSelected.emit(reg);
    const { curp } = this.curpForm.value;
    this.subcription.add(
    this.registerP.searchPatientByCurp(curp).subscribe(res => this.curpValue.emit(res.informacion.pacientes))
    );
  }

  public resetForm() {
    this.resetCurp.emit(true);
    this.curpForm.reset();
  }
}
