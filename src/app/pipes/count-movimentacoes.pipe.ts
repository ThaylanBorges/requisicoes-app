import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countMovimentacoes',
})
export class CountMovimentacoesPipe implements PipeTransform {
  transform(items: any[]): any {
    if (!items || items.length == 0) {
      return 0;
    } else {
      return items.length;
    }
  }
}
