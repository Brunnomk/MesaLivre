import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Mesa } from '../../core/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-mesas',
  imports: [Sidebar, FormsModule, RouterLink],
  templateUrl: './mesas.html',
  styleUrl: './mesas.scss',
})
export class Mesas implements OnInit {
  mesas: Mesa[] = [];
  mesasFiltradas: Mesa[] = [];

  filtroNome = '';
  filtroTipo = '';
  filtroStatus = '';

  constructor(
    private mesaService: MesaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarMesas();
  }

  carregarMesas(): void {
    this.mesaService.listarMesas().subscribe({
      next: (mesas) => {
        this.mesas = mesas;
        this.mesasFiltradas = [...this.mesas];

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar mesas:', erro);
      },
    });
  }

  aplicarFiltros(): void {
    const nomeFiltro = this.filtroNome.toLowerCase().trim();

    this.mesasFiltradas = this.mesas.filter((mesa) => {
      const nomeCorresponde = mesa.nome.toLowerCase().includes(nomeFiltro);

      const tipoCorresponde = this.filtroTipo ? mesa.tipo === this.filtroTipo : true;

      const statusCorresponde = this.filtroStatus ? mesa.status === this.filtroStatus : true;

      return nomeCorresponde && tipoCorresponde && statusCorresponde;
    });

    this.cdr.detectChanges();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroTipo = '';
    this.filtroStatus = '';
    this.mesasFiltradas = [...this.mesas];

    this.cdr.detectChanges();
  }

  excluirMesa(mesa: Mesa): void {
    const confirmarExclusao = confirm(`Deseja realmente excluir ${mesa.nome}?`);

    if (!confirmarExclusao) {
      return;
    }

    this.mesaService.excluirMesa(mesa.id).subscribe({
      next: () => {
        this.carregarMesas();
      },
      error: (erro) => {
        console.error('Erro ao excluir mesa:', erro);

        const mensagem =
          this.obterMensagemErro(erro) ||
          'Não é possível excluir esta mesa porque existem reservas associadas.';

        alert(mensagem);
      },
    });
  }

  getTipoLabel(tipo: Mesa['tipo']): string {
    const labels: Record<Mesa['tipo'], string> = {
      MESA: 'Mesa',
      SALA: 'Sala',
    };

    return labels[tipo];
  }

  getStatusLabel(status: Mesa['status']): string {
    const labels: Record<Mesa['status'], string> = {
      DISPONIVEL: 'Disponível',
      RESERVADA: 'Reservada',
      OCUPADA: 'Ocupada',
      INATIVA: 'Inativa',
    };

    return labels[status];
  }

  getStatusClass(status: Mesa['status']): string {
    const classes: Record<Mesa['status'], string> = {
      DISPONIVEL: 'available',
      RESERVADA: 'reserved',
      OCUPADA: 'occupied',
      INATIVA: 'inactive',
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
