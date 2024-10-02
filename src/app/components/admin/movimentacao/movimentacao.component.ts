import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css'],
})
export class MovimentacaoComponent {
  @Input() funcionarioLogado!: Funcionario;
  requisicoes$!: Observable<Requisicao[]>;
  movimentacoes!: Movimentacao[];
  requisicaoSelecionada!: Requisicao;
  edit: boolean = false;
  displayDialogMovimentacao: boolean = false;
  displayDialogMovimentacoes: boolean = false;
  form!: FormGroup;
  listaStatus!: string[];

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.configForm();
    this.carregaStatus();
    this.listaRequisicaoDepartamento();
  }

  configForm() {
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }

  carregaStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processando',
      'Não autorizado  ',
      'Finalizado',
    ];
  }

  listaRequisicaoDepartamento() {
    this.requisicoes$ = this.requisicaoService
      .list()
      .pipe(
        map((reqs: Requisicao[]) =>
          reqs.filter(
            (r) => r.destino.nome === this.funcionarioLogado.departamento.nome
          )
        )
      );
  }

  setValorPadra() {
    this.form.patchValue({
      funcinario: this.funcionarioLogado,
      dataHora: new Date(),
    });
    this.movimentacoes = [];
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    this.setValorPadra();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = !requisicao.movimentacoes
      ? []
      : requisicao.movimentacoes;
    this.displayDialogMovimentacao = true;
  }

  verMovimentacoes(requisicao: Requisicao) {
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }

  onDialogClose(event: any) {
    this.displayDialogMovimentacoes = event;
  }

  save() {
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService
      .createOrUpdate(this.requisicaoSelecionada)
      .then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Requisição ${!this.edit ? 'salvo' : 'atualizado'} com sucesso`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a Requisição`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delete(departamento: Departamento) {
    Swal.fire({
      title: 'Confirma a exclução da Requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(departamento.id).then(() => {
          Swal.fire('Requisição excluída com sucesso!', '', 'success');
        });
      }
    });
  }
}
