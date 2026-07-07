import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Reserva } from '../../core/models/reserva.model';
import { ReservaService } from '../../core/services/reserva.service';

@Component({
  selector: 'app-reservas',
  imports: [Sidebar, RouterLink, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas implements OnInit {
  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];

  filtroCliente = '';
  filtroData = '';
  filtroStatus = '';

  constructor(
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.reservaService.listarReservas().subscribe({
      next: (reservas) => {
        console.log('Reservas vindas do backend:', reservas);

        this.reservas = reservas;
        this.reservasFiltradas = [...this.reservas];

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar reservas:', erro);
      },
    });
  }

  aplicarFiltros(): void {
    const clienteFiltro = this.filtroCliente.toLowerCase().trim();

    this.reservasFiltradas = this.reservas.filter((reserva) => {
      const clienteCorresponde = reserva.cliente.toLowerCase().includes(clienteFiltro);

      const dataCorresponde = this.filtroData
        ? reserva.data === this.formatarDataFiltro(this.filtroData)
        : true;

      const statusCorresponde = this.filtroStatus ? reserva.status === this.filtroStatus : true;

      return clienteCorresponde && dataCorresponde && statusCorresponde;
    });

    this.cdr.detectChanges();
  }

  limparFiltros(): void {
    this.filtroCliente = '';
    this.filtroData = '';
    this.filtroStatus = '';
    this.reservasFiltradas = [...this.reservas];

    this.cdr.detectChanges();
  }

  confirmarReserva(reserva: Reserva): void {
    this.reservaService.confirmarReserva(reserva.id).subscribe({
      next: () => {
        this.carregarReservas();
      },
      error: (erro) => {
        console.error('Erro ao confirmar reserva:', erro);
        alert('Erro ao confirmar reserva. Verifique se a reserva pode ser confirmada.');
      },
    });
  }

  cancelarReserva(reserva: Reserva): void {
    const confirmarCancelamento = confirm(
      `Deseja realmente cancelar a reserva de ${reserva.cliente}?`,
    );

    if (!confirmarCancelamento) {
      return;
    }

    this.reservaService.cancelarReserva(reserva.id).subscribe({
      next: () => {
        this.carregarReservas();
      },
      error: (erro) => {
        console.error('Erro ao cancelar reserva:', erro);
        alert('Erro ao cancelar reserva. Verifique se a reserva pode ser cancelada.');
      },
    });
  }

  finalizarReserva(reserva: Reserva): void {
    this.reservaService.finalizarReserva(reserva.id).subscribe({
      next: () => {
        this.carregarReservas();
      },
      error: (erro) => {
        console.error('Erro ao finalizar reserva:', erro);
        alert('Erro ao finalizar reserva. Somente reservas confirmadas podem ser finalizadas.');
      },
    });
  }

  excluirReserva(reserva: Reserva): void {
    const confirmarExclusao = confirm(`Deseja realmente excluir a reserva de ${reserva.cliente}?`);

    if (!confirmarExclusao) {
      return;
    }

    this.reservaService.excluirReserva(reserva.id).subscribe({
      next: () => {
        this.carregarReservas();
      },
      error: (erro) => {
        console.error('Erro ao excluir reserva:', erro);
        alert('Erro ao excluir reserva. Verifique o console.');
      },
    });
  }

  podeConfirmar(reserva: Reserva): boolean {
    return reserva.status === 'AGENDADA';
  }

  podeCancelar(reserva: Reserva): boolean {
    return reserva.status === 'AGENDADA' || reserva.status === 'CONFIRMADA';
  }

  podeFinalizar(reserva: Reserva): boolean {
    return reserva.status === 'CONFIRMADA';
  }

  getStatusLabel(status: Reserva['status']): string {
    const labels: Record<Reserva['status'], string> = {
      AGENDADA: 'Agendada',
      CONFIRMADA: 'Confirmada',
      CANCELADA: 'Cancelada',
      FINALIZADA: 'Finalizada',
      NO_SHOW: 'No-show',
    };

    return labels[status];
  }

  getStatusClass(status: Reserva['status']): string {
    const classes: Record<Reserva['status'], string> = {
      AGENDADA: 'scheduled',
      CONFIRMADA: 'confirmed',
      CANCELADA: 'cancelled',
      FINALIZADA: 'finished',
      NO_SHOW: 'no-show',
    };

    return classes[status];
  }

  private formatarDataFiltro(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
