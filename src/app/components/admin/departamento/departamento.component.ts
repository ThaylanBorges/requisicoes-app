import { Component } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// modelos
import { Departamento } from './../../../models/departamento.model';

// forms
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// swal
import Swal from 'sweetalert2';

// services
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
})
export class DepartamentoComponent {
  departamentos$: Observable<Departamento[]>; // o '$' indica uma operação assíncrona
  edit: boolean = false;
  displayDialogDepartamento: boolean = false;
  form!: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private fb: FormBuilder
  ) {
    this.departamentos$ = this.departamentoService.list();
  }

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl(''),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  editarDepartamento(departamento: Departamento) {
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
          `Departamento ${!this.edit ? 'salvo' : 'atualizado'} com sucesso!`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogDepartamento = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} o departamento!`,
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
          return this.departamentoService.delete(departamento.id);
        }
        throw new Error('Ação cancelada pelo usuário');
      })
      .then(() => {
        Swal.fire('Departamento excluído com sucesso!', '', 'success');
      })
      .catch((erro) => {
        Swal.fire(
          'Erro ao excluir o departamento',
          `Detalhes: ${erro.message}`,
          'error'
        );
      });
  }
}
