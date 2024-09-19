import { Pipe, PipeTransform } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';

@Pipe({
  name: 'filter',
})
export class FilterDepartamentoPipe implements PipeTransform {
  transform(value: any, filtro: any): any {
    if ((filtro = 'TODOS')) {
      return value;
    }
    if (value) {
      return value.filter(
        (element: Funcionario) => element.departamento.nome === filtro
      );
    }
  }
}
