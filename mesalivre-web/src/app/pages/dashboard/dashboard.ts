import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Reserva } from '../../core/models/reserva.model';
import { Mesa } from '../../core/models/mesa.model';
import { Cliente } from '../../core/models/cliente.model';
import { ReservaService } from '../../core/services/reserva.service';
import { MesaService } from '../../core/services/mesa.service';
import { ClienteService } from '../../core/services/cliente.service';

interface DashboardMetric {
  title: string;
  value: string;
  description: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  reservas: Reserva[] = [];
  mesas: Mesa[] = [];
  clientes: Cliente[] = [];

  reservasRecentes: Reserva[] = [];

  mesasLivres = 0;
  mesasReservadas = 0;
  mesasOcupadas = 0;

  metrics: DashboardMetric[] = [
    {
      title: 'Reservas hoje',
      value: '0',
      description: 'Reservas cadastradas para hoje',
      percentage: 0,
      color: '#2563eb',
    },
    {
      title: 'Mesas disponíveis',
      value: '0',
      description: '0 mesas cadastradas',
      percentage: 0,
      color: '#16a34a',
    },
    {
      title: 'Clientes',
      value: '0',
      description: 'Clientes cadastrados',
      percentage: 0,
      color: '#7c3aed',
    },
    {
      title: 'Taxa de ocupação',
      value: '0%',
      description: 'Baseada nas mesas não disponíveis',
      percentage: 0,
      color: '#f59e0b',
    },
  ];

  constructor(
    private reservaService: ReservaService,
    private mesaService: MesaService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    forkJoin({
      reservas: this.reservaService.listarReservas(),
      mesas: this.mesaService.listarMesas(),
      clientes: this.clienteService.listarClientes(),
    }).subscribe({
      next: ({ reservas, mesas, clientes }) => {
        console.log('Dados reais da dashboard:', {
          reservas,
          mesas,
          clientes,
        });

        this.reservas = reservas;
        this.mesas = mesas;
        this.clientes = clientes;

        this.calcularMetricas();
        this.carregarReservasRecentes();
        this.calcularDisponibilidade();

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar dashboard:', erro);
      },
    });
  }

  private calcularMetricas(): void {
    const hoje = this.getDataAtualFrontend();

    const reservasHoje = this.reservas.filter((reserva) => reserva.data === hoje).length;

    const totalMesas = this.mesas.length;

    const mesasDisponiveis = this.mesas.filter((mesa) => mesa.status === 'DISPONIVEL').length;

    const totalClientes = this.clientes.length;

    const mesasNaoDisponiveis = this.mesas.filter((mesa) => mesa.status !== 'DISPONIVEL').length;

    const taxaOcupacao = totalMesas > 0 ? Math.round((mesasNaoDisponiveis / totalMesas) * 100) : 0;

    const percentualReservasHoje =
      this.reservas.length > 0 ? Math.round((reservasHoje / this.reservas.length) * 100) : 0;

    const percentualMesasDisponiveis =
      totalMesas > 0 ? Math.round((mesasDisponiveis / totalMesas) * 100) : 0;

    this.metrics = [
      {
        title: 'Reservas hoje',
        value: String(reservasHoje),
        description: 'Reservas cadastradas para hoje',
        percentage: percentualReservasHoje,
        color: '#2563eb',
      },
      {
        title: 'Mesas disponíveis',
        value: String(mesasDisponiveis),
        description: `${totalMesas} mesas cadastradas`,
        percentage: percentualMesasDisponiveis,
        color: '#16a34a',
      },
      {
        title: 'Clientes',
        value: String(totalClientes),
        description: 'Clientes cadastrados no sistema',
        percentage: totalClientes > 0 ? 100 : 0,
        color: '#7c3aed',
      },
      {
        title: 'Taxa de ocupação',
        value: `${taxaOcupacao}%`,
        description: 'Baseada nas mesas não disponíveis',
        percentage: taxaOcupacao,
        color: '#f59e0b',
      },
    ];
  }

  private carregarReservasRecentes(): void {
    this.reservasRecentes = [...this.reservas].sort((a, b) => b.id - a.id).slice(0, 4);
  }

  private calcularDisponibilidade(): void {
    this.mesasLivres = this.mesas.filter((mesa) => mesa.status === 'DISPONIVEL').length;

    this.mesasReservadas = this.mesas.filter((mesa) => mesa.status === 'RESERVADA').length;

    this.mesasOcupadas = this.mesas.filter((mesa) => mesa.status === 'OCUPADA').length;
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

  private getDataAtualFrontend(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
}
