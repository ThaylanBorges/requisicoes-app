import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrimeNGModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequisicaoComponent],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    NgSelectModule,
    PrimeNGModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RequisicaoModule {}
