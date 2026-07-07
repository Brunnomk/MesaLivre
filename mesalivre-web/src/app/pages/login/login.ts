import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  senha = '';

  formularioEnviado = false;
  entrando = false;
  erroLogin = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  entrar(): void {
    if (this.entrando) {
      return;
    }

    this.formularioEnviado = true;
    this.erroLogin = '';

    if (this.formularioInvalido()) {
      this.erroLogin = 'Informe e-mail e senha para entrar no sistema.';
      this.cdr.detectChanges();
      return;
    }

    this.entrando = true;
    this.cdr.detectChanges();

    const dadosLogin = {
      email: this.email.trim().toLowerCase(),
      senha: this.senha.trim(),
    };

    this.authService
      .login(dadosLogin)
      .pipe(
        finalize(() => {
          this.entrando = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (usuario) => {
          this.authService.salvarSessao(usuario, false);
          void this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          console.error('Erro ao fazer login:', erro);

          this.erroLogin = this.obterMensagemErro(erro) || 'E-mail ou senha inválidos.';

          this.cdr.detectChanges();
        },
      });
  }

  limparErro(): void {
    if (this.erroLogin) {
      this.erroLogin = '';
      this.cdr.detectChanges();
    }
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
    return this.formularioEnviado && !this.senha.trim();
  }

  formularioInvalido(): boolean {
    return !this.email.trim() || !this.senha.trim() || !this.emailValido(this.email.trim());
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
