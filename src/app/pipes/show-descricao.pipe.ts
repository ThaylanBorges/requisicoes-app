import { Pipe, PipeTransform } from '@angular/core';
import { Requisicao } from '../models/requisicao.model';

@Pipe({
  name: 'showDescricao',
})
export class ShowDescricaoPipe implements PipeTransform {
  transform(value: Requisicao): string {
    if (value) {
      return value.descricao;
    }
    return '';
  }
}
