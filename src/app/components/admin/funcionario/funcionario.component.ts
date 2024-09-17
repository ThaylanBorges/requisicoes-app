import { Component } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// models
import { Departamento } from './../../../models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';

// services
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from './../../../services/funcionario.service';

// forms
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// swal
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent {
  funcionarios$: Observable<Funcionario[]> = new Observable();
  departamentos$: Observable<Departamento[]> = new Observable();
  departamentoFiltro: string = '';
  edit: boolean = false;
  displayDialogFuncionario: boolean = false;
  form!: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.funcionarios$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
    this.departamentoFiltro = 'TODOS';
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      funcao: new FormControl(),
      departamento: new FormControl('', Validators.required),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

  selecionaFuncionario(funcionario: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(funcionario);
  }

  save() {
    this.departamentoService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Funcionário ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogFuncionario = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Funcionário`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }
}
