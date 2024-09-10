import { Departamento } from './../../../models/departamento.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent {
  departamento$: Observable<Departamento[]> = new Observable(); // o $ indica uma operação assíncrona
  edit: boolean = false;
  displayDialogDepartamento: boolean = true;
  form!: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.departamento$ = this.departamentoService.list();
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl(''),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  selecionaDepartamento(departamento: Departamento) {
    this.edit = true;
    this.displayDialogDepartamento = true;
    this.form.setValue(departamento);
  }

  save() {
    this.departamentoService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogDepartamento = false;
        Swal.fire(
          `Departamento ${!this.edit ? 'salvo' : 'atualizado'} com sucesso`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogDepartamento = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} o departamento`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
  }

  delete(departamento: Departamento) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    })
      .then((result) => {
        if (result.value) {
          this.departamentoService.delete(departamento.id);
        }
      })
      .then(() => {
        Swal.fire('Departamento excluído com sucesso!', '', 'success');
      });
  }
}
