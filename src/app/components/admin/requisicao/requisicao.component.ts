import { Component } from '@angular/core';

// modulos genéricos
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';

// forms
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// rxjs
import { map, Observable } from 'rxjs';

// Swal
import Swal from 'sweetalert2';

// services
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css'],
})
export class RequisicaoComponent {
  requisicao$!: Observable<Requisicao[]>;
  departamento$!: Observable<Departamento[]>;
  edit: boolean = false;
  displayDialogRequisicao: boolean = false;
  form!: FormGroup;
  funcionarioLogado!: Funcionario;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private funcionarioService: FuncionarioService,
    private auth: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.departamento$ = this.departamentoService.list();
    this.configForm();
    this.recuperarFuncionario();
  }

  async recuperarFuncionario() {
    return this.auth.authUser().subscribe((dados) => {
      this.funcionarioService
        .getFuncionarioLogado(dados.email!)
        .subscribe((funcionario) => {
          this.funcionarioLogado = funcionario[0];
          this.funcionarioLogado;

          this.requisicao$ = this.requisicaoService
            .list()
            .pipe(
              map((requisicao: Requisicao[]) =>
                requisicao.filter(
                  (r) => r.solicitante.email === this.funcionarioLogado.email
                )
              )
            );
        });
    });
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      movimentacoes: new FormControl(''),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.displayDialogRequisicao = true;
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
      movimentacoes: [],
    });
  }

  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
    this.requisicaoService
      .createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogRequisicao = false;
        Swal.fire(
          `Requisição ${!this.edit ? 'salvo' : 'atualizado'} com sucesso`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogRequisicao = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a requisição`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
  }

  delete(requisicao: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão da requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    })
      .then((result) => {
        if (result.value) {
          return this.requisicaoService.delete(requisicao.id);
        }
        throw new Error('Ação cancelada pelo usuário');
      })
      .then(() => {
        Swal.fire('Requisição excluído com sucesso!', '', 'success');
      })
      .catch((erro) => {
        Swal.fire(
          'Erro ao excluir o requisição',
          `Detalhes: ${erro.message}`,
          'error'
        );
      });
  }
}
