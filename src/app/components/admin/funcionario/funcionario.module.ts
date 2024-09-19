import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// pipes
import { FilterDepartamentoPipe } from 'src/app/pipes/filter-departamento.pipe';

import { PrimeNGModule } from 'src/app/modules/prime-ng/prime-ng.module';

@NgModule({
  declarations: [FuncionarioComponent, FilterDepartamentoPipe],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    FormsModule,
    PrimeNGModule,
    ReactiveFormsModule,
  ],
})
export class FuncionarioModule {}
