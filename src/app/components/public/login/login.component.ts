import { AuthenticationService } from './../../../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagem: string = '';
  emailEnviado: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logar() {
    try {
      if (this.email == undefined || this.senha == undefined) {
        this.mensagem = 'Usuário ou senha vazios';
        return;
      }

      this.authService
        .login(this.email, this.senha)
        .then(() => this.router.navigate(['/admin/painel']))
        .catch((erro) => {
          let detalhes = '';

          switch (erro.code) {
            case 'auth/user-not-fund': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha inválida';
              break;
            }

            default: {
              detalhes = erro.mensagem;
              break;
            }
          }

          this.mensagem = `Error ao logar. ${detalhes}`;
        });
    } catch (erro) {
      this.mensagem = `Error ao logar. Detalhes. ${erro}`;
    }
  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      // fire é responsável por lançar alerts com base nas configurações
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email',
    });
    if (email) {
      this.authService
        .resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instruções para recuperação`;
        })
        .catch((erro) => {
          this.mensagem = `Email não encontrado. Detalhes ${erro.mensagem}`;
        });
    }
  }
}
