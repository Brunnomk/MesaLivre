import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  formularioEnviado = false;
  cadastrando = false;

  mensagemErro = '';
  mensagemSucesso = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  criarConta(): void {
    this.formularioEnviado = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    console.log('Tentando criar conta...');

    if (this.formularioInvalido()) {
      this.mensagemErro = 'Verifique os campos obrigatórios antes de criar a conta.';
      console.warn('Formulário inválido.');
      return;
    }

    this.cadastrando = true;

    const dadosCadastro = {
      nome: this.nome.trim(),
      email: this.email.trim().toLowerCase(),
      senha: this.senha.trim(),
    };

    console.log('Dados enviados para cadastro:', dadosCadastro);

    this.authService.cadastrarUsuario(dadosCadastro).subscribe({
      next: () => {
        this.cadastrando = false;
        this.mensagemSucesso = 'Conta criada com sucesso. Redirecionando para o login...';

        setTimeout(() => {
          void this.router.navigate(['/login']);
        }, 1200);
      },
      error: (erro) => {
        this.cadastrando = false;
        console.error('Erro ao criar conta:', erro);

        this.mensagemErro =
          this.obterMensagemErro(erro) || 'Não foi possível criar a conta. Tente novamente.';
      },
    });
  }

  nomeInvalido(): boolean {
    return this.formularioEnviado && !this.nome.trim();
  }

  emailInvalido(): boolean {
    if (!this.formularioEnviado) {
      return false;
    }

    const emailTratado = this.email.trim();

    if (!emailTratado) {
      return true;
    }

    return !this.emailValido(emailTratado);
  }

  senhaInvalida(): boolean {
    return this.formularioEnviado && this.senha.trim().length < 6;
  }

  confirmarSenhaInvalida(): boolean {
    return this.formularioEnviado && this.confirmarSenha !== this.senha;
  }

  formularioInvalido(): boolean {
    return (
      !this.nome.trim() ||
      !this.email.trim() ||
      !this.emailValido(this.email.trim()) ||
      this.senha.trim().length < 6 ||
      this.confirmarSenha !== this.senha
    );
  }

  private emailValido(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  private obterMensagemErro(erro: any): string | null {
    if (typeof erro?.error === 'string') {
      return erro.error;
    }

    if (erro?.error?.mensagem) {
      return erro.error.mensagem;
    }

    if (erro?.error?.message) {
      return erro.error.message;
    }

    if (erro?.message) {
      return erro.message;
    }

    return null;
  }
}
