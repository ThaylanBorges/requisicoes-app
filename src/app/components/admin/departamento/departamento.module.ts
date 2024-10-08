// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular forms
import { ReactiveFormsModule } from '@angular/forms';

// primeNg
import { SharedModule } from 'primeng/api';

// routing
import { DepartamentoRoutingModule } from './departamento-routing.module';

// components
import { DepartamentoComponent } from './departamento.component';
import { PrimeNGModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class DepartamentoModule {}
