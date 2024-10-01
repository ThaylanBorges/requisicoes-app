import { authGuardGuard } from './../../../guards/auth-guard.guard';
import { Component } from '@angular/core';

// modulos genéricos
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';

// forms
import { FormBuilder, FormGroup } from '@angular/forms';

// rxjs
import { map, Observable } from 'rxjs';

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

  async recuperarFuncionario() {
    await this.auth.authUser().subscribe((dados) => {
      this.funcionarioService
        .getFuncionarioLogado(dados.email!)
        .subscribe((funcionario) => {
          this.funcionarioLogado = funcionario[0];
          this.requisicao$ = this.requisicaoService.list().pipe(
            map((reqs: Requisicao[]) =>
              reqs.filter((r) => {
                r.solicitante.email === this.funcionarioLogado.email;
              })
            )
          );
        });
    });
  }
}
