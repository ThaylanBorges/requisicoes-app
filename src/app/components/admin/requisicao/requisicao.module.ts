import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrimeNGModule } from 'src/app/modules/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovimentacaoComponent } from '../movimentacao/movimentacao.component';
import { CountMovimentacoesPipe } from 'src/app/pipes/count-movimentacoes.pipe';
import { ShowSolicitantePipe } from 'src/app/pipes/show-solicitante.pipe';

@NgModule({
  declarations: [
    RequisicaoComponent,
    MovimentacaoComponent,
    CountMovimentacoesPipe,
    ShowSolicitantePipe,
  ],
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
