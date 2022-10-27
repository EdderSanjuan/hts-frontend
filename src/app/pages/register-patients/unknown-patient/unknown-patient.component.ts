/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SexResponse, Response, UnknownPatientRegister } from '@interfaces';
import { CatalogosService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unknown-patient',
  templateUrl: './unknown-patient.component.html',
  styleUrls: ['./unknown-patient.component.scss']
})
export class UnknownPatientComponent implements OnInit,OnDestroy {
  
  private subscription = new Subscription();
  unknownPatientForm : FormGroup = this.fb.group({
    noPatient:[''],
    noExpedient:[''],
    expedientType:[],
    name:[''],
    pLastName:[''],
    mLastName:[''],
    sex: [''],
    weight:[''],
    size:[''],
    procedency:[],
    patientNotes:[],
    tel:[''],
    typeTel:['']

  });

  sexOptions !: SexResponse;
  precedencyOptions !: Response;
  constructor(private fb : FormBuilder, private catalogS : CatalogosService) { }

  ngOnInit(): void {
    this.initSelects();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addUnknownPatient():void{
    const {
      noPatient, noExpedient,expedientType,
      name,pLastName,mLastName,sex,weight,
      size,procedency,patientNotes,tel,typeTel
    } = this.unknownPatientForm.value;


    const body : UnknownPatientRegister = {
      noPaciente:noPatient,
      noExpediente: noExpedient,
      tipoExpediente: expedientType,
      nombre: name,
      primerApellido: pLastName,
      segundoApellido: mLastName,
      sexo_id:sex,
      peso:weight,
      talla: size,
      procedencia_id: procedency,
      notasPaciente: patientNotes,
      telefono:tel,
      tipoTel_id:typeTel

    };

      
  }

  public initSelects():void{
    this.initSexOptions();
    this.initPrecedencyOptions();
  }

  public initSexOptions():void{

    this.subscription.add(
      this.catalogS
      .getSexList()
      .subscribe((res) => (this.sexOptions = res))
    );
  }

  public initPrecedencyOptions():void{
    this.subscription.add(
      this.catalogS.getPrecedencyList().subscribe((res) => this.precedencyOptions = res)
    )
  }



}
