import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing
import { FuncionarioRoutingModule } from './funcionario-routing.module';

// components
import { FuncionarioComponent } from './funcionario.component';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// pipes
import { FilterDepartamentoPipe } from 'src/app/pipes/filter-departamento.pipe';

// primeNg
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
