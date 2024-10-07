import { Component, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent {
  @Input() movimentacoes!: Movimentacao[];
  @Input() requisicaoSelecionada!: Requisicao;
  @Input() funcionarioLogado!: Funcionario;
  @Input() displayDialogMovimentacoes: boolean = false;
  @Input() displayChange = new EventEmitter();

  listaStatus: string[] = [];
  displayDialogMovimentacao: boolean = false;
  form!: FormGroup;
  edit: boolean = false;
  indexMovimentacoes!: number;

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.configForm();
    this.carregamentoStatus();
  }

  configForm() {
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
    });
  }
  carregamentoStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processo',
      'Não autorizada',
      'Finalizado',
    ];
  }

  selecionarMovimento(mov: Movimentacao, index: number) {
    this.edit = true;
    this.displayDialogMovimentacao = true;
    this.form.setValue(mov);
    this.indexMovimentacoes = index;
  }

  onClose() {
    this.displayChange.emit(false);
  }

  update() {
    this.movimentacoes[this.indexMovimentacoes] = this.form.value;
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService
      .createOrUpdate(this.requisicaoSelecionada)
      .then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Movimentação ${!this.edit ? 'salvo' : 'atualizado'}`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a Movimentação`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  remove(array: Movimentacao[], element: any) {
    return array.filter((el) => el !== element);
  }

  delete(mov: Movimentacao) {
    const movs = this.remove(this.movimentacoes, mov);

    Swal.fire({
      title: 'Confirma a exclusão da Movimentação?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result) {
        this.requisicaoSelecionada.movimentacoes = movs;
        this.requisicaoService
          .createOrUpdate(this.requisicaoSelecionada)
          .then(() => {
            Swal.fire('Movimentação excluída com sucesso!', '', 'success');
            this.movimentacoes = movs;
          });
      }
    });
  }
}
