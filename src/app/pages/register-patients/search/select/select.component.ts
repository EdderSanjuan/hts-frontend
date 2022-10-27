import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() options!: string[];
  @Input() label!: string;

  @Output() value = new EventEmitter<number>();

  selecionado!: number;
  constructor() {}

  public cambio(option: any) {
    this.selecionado = option;
    this.value.emit(this.selecionado);
  }
}
