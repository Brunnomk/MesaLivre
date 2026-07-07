import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Cliente } from '../../core/models/cliente.model';
import { ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-clientes',
  imports: [Sidebar, FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  filtroNome = '';
  filtroStatus = '';

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = [...this.clientes];

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      },
    });
  }

  aplicarFiltros(): void {
    const nomeFiltro = this.filtroNome.toLowerCase().trim();

    this.clientesFiltrados = this.clientes.filter((cliente) => {
      const nomeCorresponde = cliente.nome.toLowerCase().includes(nomeFiltro);

      const statusCorresponde = this.filtroStatus ? cliente.status === this.filtroStatus : true;

      return nomeCorresponde && statusCorresponde;
    });

    this.cdr.detectChanges();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroStatus = '';
    this.clientesFiltrados = [...this.clientes];

    this.cdr.detectChanges();
  }

  excluirCliente(cliente: Cliente): void {
    const confirmarExclusao = confirm(`Deseja realmente excluir ${cliente.nome}?`);

    if (!confirmarExclusao) {
      return;
    }

    this.clienteService.excluirCliente(cliente.id).subscribe({
      next: () => {
        this.carregarClientes();
      },
      error: (erro) => {
        console.error('Erro ao excluir cliente:', erro);

        const mensagem =
          this.obterMensagemErro(erro) ||
          'Não é possível excluir este cliente porque existem reservas associadas.';

        alert(mensagem);
      },
    });
  }

  getStatusLabel(status: Cliente['status']): string {
    const labels: Record<Cliente['status'], string> = {
      ATIVO: 'Ativo',
      INATIVO: 'Inativo',
      VIP: 'VIP',
    };

    return labels[status];
  }

  getStatusClass(status: Cliente['status']): string {
    const classes: Record<Cliente['status'], string> = {
      ATIVO: 'active',
      INATIVO: 'inactive',
      VIP: 'vip',
    };

    return classes[status];
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
