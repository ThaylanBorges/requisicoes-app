import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FuncionarioComponent],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class FuncionarioModule {}
