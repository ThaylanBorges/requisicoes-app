import { Pipe, PipeTransform } from '@angular/core';
import { Requisicao } from '../models/requisicao.model';

@Pipe({
  name: 'showSolicitante',
})
export class ShowSolicitantePipe implements PipeTransform {
  transform(value: Requisicao): string {
    if (value) {
      return value.solicitante.nome;
    }
    return '';
  }
}
