import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-custom.input.primeng',
  standalone: true,
  imports: [InputTextModule,FormsModule,ReactiveFormsModule,CommonModule],
  template: `
  <form [formGroup]="formInputPrime">
    <div>
      <label for="name">Nombre:</label>
      <input id="name" pInputText formControlName="name" />
      <div *ngIf="form.get('name')?.invalid && (form.get('name')?.touched || form.get('name')?.dirty)">
        <small class="error" style="color: red;">El nombre es requerido.</small>
      </div>
    </div>
    <button type="submit" pButton label="Enviar" [disabled]="form.invalid"></button>
  </form>

  `,
  styles: ``
})
export class CustomInputPrimengComponent extends JsonFormsControl {
  formInputPrime: FormGroup;
  constructor(service: JsonFormsAngularService, private fb: FormBuilder) {
    super(service);
    this.formInputPrime = this.fb.group({
      name: ['', Validators.required] // Campo requerido
    });
  }
  public override mapAdditionalProps(props: ControlProps) {
    // ahi se configuraria todas las validaciones
    
  }

}
