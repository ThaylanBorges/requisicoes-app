import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RequisicaoComponent],
  imports: [CommonModule, RequisicaoRoutingModule, NgSelectModule],
})
export class RequisicaoModule {}
