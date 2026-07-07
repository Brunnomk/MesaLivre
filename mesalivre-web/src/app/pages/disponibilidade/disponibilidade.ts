import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Mesa } from '../../core/models/mesa.model';
import { Reserva } from '../../core/models/reserva.model';
import { Restaurante } from '../../core/models/restaurante.model';
import { MesaService } from '../../core/services/mesa.service';
import { ReservaService } from '../../core/services/reserva.service';
import { RestauranteService } from '../../core/services/restaurante.service';

@Component({
  selector: 'app-disponibilidade',
  imports: [Sidebar, FormsModule, RouterLink],
  templateUrl: './disponibilidade.html',
  styleUrl: './disponibilidade.scss',
})
export class Disponibilidade implements OnInit {
  restaurantes: Restaurante[] = [];
  mesas: Mesa[] = [];
  mesasFiltradas: Mesa[] = [];
  reservas: Reserva[] = [];

  restaurante = '';
  data = '';
  horaInicio = '';
  horaFim = '';
  pessoas: number | null = null;

  consultaRealizada = false;

  constructor(
    private restauranteService: RestauranteService,
    private mesaService: MesaService,
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    forkJoin({
      restaurantes: this.restauranteService.listarRestaurantes(),
      mesas: this.mesaService.listarMesas(),
      reservas: this.reservaService.listarReservas(),
    }).subscribe({
      next: ({ restaurantes, mesas, reservas }) => {
        console.log('Restaurantes reais para disponibilidade:', restaurantes);
        console.log('Mesas reais para disponibilidade:', mesas);
        console.log('Reservas reais para disponibilidade:', reservas);

        this.restaurantes = restaurantes;
        this.mesas = mesas;
        this.reservas = reservas;

        if (this.restaurantes.length > 0) {
          this.restaurante = this.restaurantes[0].nome;
        }

        this.mesasFiltradas = [...this.mesas];

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar disponibilidade:', erro);
      },
    });
  }

  consultar(): void {
    this.consultaRealizada = true;

    if (this.consultaInvalida()) {
      return;
    }

    const dataConsulta = this.formatarDataFiltro(this.data);
    const inicioConsulta = this.horaInicio;
    const fimConsulta = this.horaFim;

    this.mesasFiltradas = this.mesas.filter((mesa) => {
      const capacidadeCorresponde = this.pessoas ? mesa.capacidade >= this.pessoas : true;

      const mesaOperacional = mesa.status !== 'INATIVA';

      const mesaTemConflito = this.reservas.some((reserva) => {
        const reservaAtiva = reserva.status === 'AGENDADA' || reserva.status === 'CONFIRMADA';

        const mesmaMesa = reserva.mesa === mesa.nome;
        const mesmaData = reserva.data === dataConsulta;

        if (!reservaAtiva || !mesmaMesa || !mesmaData) {
          return false;
        }

        const [inicioReserva, fimReserva] = reserva.horario.split('-').map((hora) => hora.trim());

        return inicioConsulta < fimReserva && fimConsulta > inicioReserva;
      });

      return capacidadeCorresponde && mesaOperacional && !mesaTemConflito;
    });

    this.cdr.detectChanges();
  }

  limparConsulta(): void {
    this.restaurante = this.restaurantes[0]?.nome ?? '';
    this.data = '';
    this.horaInicio = '';
    this.horaFim = '';
    this.pessoas = null;
    this.consultaRealizada = false;
    this.mesasFiltradas = [...this.mesas];

    this.cdr.detectChanges();
  }

  campoInvalido(valor: string | number | null): boolean {
    return this.consultaRealizada && !valor;
  }

  pessoasInvalido(): boolean {
    return this.consultaRealizada && (!this.pessoas || this.pessoas < 1);
  }

  horarioInvalido(): boolean {
    if (!this.horaInicio || !this.horaFim) {
      return false;
    }

    return this.horaFim <= this.horaInicio;
  }

  consultaInvalida(): boolean {
    return (
      !this.restaurante ||
      !this.data ||
      !this.horaInicio ||
      !this.horaFim ||
      !this.pessoas ||
      this.pessoas < 1 ||
      this.horarioInvalido()
    );
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

  getStatusBadgeClass(status: Mesa['status']): string {
    const classes: Record<Mesa['status'], string> = {
      DISPONIVEL: 'available-status',
      RESERVADA: 'reserved-status',
      OCUPADA: 'occupied-status',
      INATIVA: 'inactive-status',
    };

    return classes[status];
  }

  getMesasLivres(): number {
    return this.mesasFiltradas.filter((mesa) => mesa.status === 'DISPONIVEL').length;
  }

  getMesasReservadas(): number {
    return this.mesasFiltradas.filter((mesa) => mesa.status === 'RESERVADA').length;
  }

  getCapacidadeTotal(): number {
    return this.mesasFiltradas
      .filter((mesa) => mesa.status !== 'INATIVA')
      .reduce((total, mesa) => total + mesa.capacidade, 0);
  }

  getMelhorOpcao(): string {
    if (!this.pessoas) {
      return this.mesasFiltradas[0]?.nome ?? 'Sem opção';
    }

    const opcoes = this.mesasFiltradas
      .filter((mesa) => mesa.status === 'DISPONIVEL')
      .sort((mesaA, mesaB) => mesaA.capacidade - mesaB.capacidade);

    const melhorMesa = opcoes.find((mesa) => mesa.capacidade >= Number(this.pessoas));

    return melhorMesa ? melhorMesa.nome : 'Sem opção';
  }

  private formatarDataFiltro(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
