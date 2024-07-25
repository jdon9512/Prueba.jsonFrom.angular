import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { CustomInputPrimengComponent } from './custom.input.primeng/custom.input.primeng.component';
import { and, isControl, rankWith } from '@jsonforms/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,    
    JsonFormsModule,
    JsonFormsAngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  valorInput: string = "inicio";
  renderers = angularMaterialRenderers;
  rendererPrimeNg = [
    ...angularMaterialRenderers,
    {
      renderer: CustomInputPrimengComponent,
      tester: rankWith(
        6,
        and(
          isControl
        )
      )
    }
  ];
  uischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: false,
        scope: '#/properties/done',
      },
      {
        type: 'Control',
        scope: '#/properties/name',
      },
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/due_date',
          },
          {
            type: 'Control',
            scope: '#/properties/recurrence',
          },
        ],
      },
    ],
  };
  schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
      },
      done: {
        type: 'boolean',
      },
      due_date: {
        type: 'string',
        format: 'date',
      },
      recurrence: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
    },
    required: ['name', 'due_date'],
  };
  data = {};
}
