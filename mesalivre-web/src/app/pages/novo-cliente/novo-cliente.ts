import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Cliente, ClienteStatus } from '../../core/models/cliente.model';
import { ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-novo-cliente',
  imports: [Sidebar, RouterLink, FormsModule],
  templateUrl: './novo-cliente.html',
  styleUrl: './novo-cliente.scss',
})
export class NovoCliente {
  nome = '';
  telefone = '';
  email = '';
  status: ClienteStatus | '' = '';

  formularioEnviado = false;
  salvando = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  salvarCliente(): void {
    this.formularioEnviado = true;

    if (this.formularioInvalido()) {
      return;
    }

    this.salvando = true;

    const novoCliente: Cliente = {
      id: 0,
      nome: this.nome.trim(),
      telefone: this.telefone.trim(),
      email: this.email.trim(),
      reservas: 0,
      status: this.status as ClienteStatus,
    };

    this.clienteService.adicionarCliente(novoCliente).subscribe({
      next: () => {
        this.salvando = false;
        void this.router.navigate(['/clientes']);
      },
      error: (erro) => {
        this.salvando = false;
        console.error('Erro ao salvar cliente:', erro);
        alert('Erro ao salvar cliente. Verifique o console.');
      },
    });
  }

  campoInvalido(valor: string): boolean {
    return this.formularioEnviado && !valor.trim();
  }

  statusInvalido(): boolean {
    return this.formularioEnviado && !this.status;
  }

  emailInvalido(): boolean {
    if (!this.formularioEnviado) {
      return false;
    }

    const emailTratado = this.email.trim();

    if (!emailTratado) {
      return true;
    }

    return !emailTratado.includes('@') || !emailTratado.includes('.');
  }

  formularioInvalido(): boolean {
    return (
      !this.nome.trim() ||
      !this.telefone.trim() ||
      !this.email.trim() ||
      this.emailInvalido() ||
      !this.status
    );
  }
}
