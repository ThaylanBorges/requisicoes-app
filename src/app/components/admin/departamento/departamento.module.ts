// modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { DepartamentoRoutingModule } from './departamento-routing.module';

// components
import { DepartamentoComponent } from './departamento.component';
import { PrimeNGModule } from 'src/app/modules/prime-ng/prime-ng.module';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
  ],
})
export class DepartamentoModule {}
