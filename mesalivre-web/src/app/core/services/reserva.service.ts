import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { AuthService } from './auth.service';
import { DemoDataService } from './demo-data.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private demoDataService: DemoDataService,
  ) {}

  listarReservas(): Observable<Reserva[]> {
    if (this.authService.estaEmModoDemo()) {
      return of(this.demoDataService.obterReservas());
    }

    return this.http
      .get<any[]>(`${this.apiUrl}/reservas`)
      .pipe(
        map((reservasBackend) =>
          reservasBackend.map((reservaBackend) =>
            this.converterReservaBackendParaFrontend(reservaBackend),
          ),
        ),
      );
  }

  adicionarReserva(
    reserva: Reserva,
    restauranteId: number,
    mesaId: number,
    clienteId: number,
  ): Observable<Reserva> {
    if (this.authService.estaEmModoDemo()) {
      const reservas = this.demoDataService.obterReservas();

      const existeConflito = reservas.some((reservaAtual) => {
        const reservaAtiva =
          reservaAtual.status === 'AGENDADA' || reservaAtual.status === 'CONFIRMADA';

        const mesmaMesa = reservaAtual.mesa === reserva.mesa;
        const mesmaData = reservaAtual.data === reserva.data;

        if (!reservaAtiva || !mesmaMesa || !mesmaData) {
          return false;
        }

        const [inicioReservaAtual, fimReservaAtual] = reservaAtual.horario
          .split('-')
          .map((hora) => hora.trim());

        const [inicioNovaReserva, fimNovaReserva] = reserva.horario
          .split('-')
          .map((hora) => hora.trim());

        return inicioNovaReserva < fimReservaAtual && fimNovaReserva > inicioReservaAtual;
      });

      if (existeConflito) {
        return throwError(() => ({
          error: {
            mensagem: 'Já existe uma reserva para esta mesa nesse horário.',
          },
        }));
      }

      const novaReserva: Reserva = {
        ...reserva,
        id: this.gerarProximoIdDemo(reservas),
        status: reserva.status ?? 'AGENDADA',
      };

      const reservasAtualizadas = [novaReserva, ...reservas];

      this.demoDataService.salvarReservas(reservasAtualizadas);

      return of(novaReserva);
    }

    const payload = {
      data: this.converterDataFrontendParaBackend(reserva.data),
      horaInicio: this.normalizarHoraParaBackend(this.extrairHoraInicio(reserva.horario)),
      horaFim: this.normalizarHoraParaBackend(this.extrairHoraFim(reserva.horario)),
      quantidadePessoas: reserva.pessoas,
      observacao: reserva.observacao ?? '',
    };

    return this.http
      .post<any>(
        `${this.apiUrl}/restaurantes/${restauranteId}/mesas/${mesaId}/clientes/${clienteId}/reservas`,
        payload,
      )
      .pipe(map((reservaBackend) => this.converterReservaBackendParaFrontend(reservaBackend)));
  }

  confirmarReserva(id: number): Observable<Reserva> {
    if (this.authService.estaEmModoDemo()) {
      return this.alterarStatusDemo(id, 'CONFIRMADA');
    }

    return this.http
      .patch<any>(`${this.apiUrl}/reservas/${id}/confirmar`, {})
      .pipe(map((reservaBackend) => this.converterReservaBackendParaFrontend(reservaBackend)));
  }

  cancelarReserva(id: number): Observable<Reserva> {
    if (this.authService.estaEmModoDemo()) {
      return this.alterarStatusDemo(id, 'CANCELADA');
    }

    return this.http
      .patch<any>(`${this.apiUrl}/reservas/${id}/cancelar`, {})
      .pipe(map((reservaBackend) => this.converterReservaBackendParaFrontend(reservaBackend)));
  }

  finalizarReserva(id: number): Observable<Reserva> {
    if (this.authService.estaEmModoDemo()) {
      const reservas = this.demoDataService.obterReservas();
      const reserva = reservas.find((reservaAtual) => reservaAtual.id === id);

      if (!reserva) {
        return throwError(() => ({
          error: {
            mensagem: 'Reserva não encontrada.',
          },
        }));
      }

      if (reserva.status !== 'CONFIRMADA') {
        return throwError(() => ({
          error: {
            mensagem: 'Só é possível finalizar uma reserva confirmada.',
          },
        }));
      }

      return this.alterarStatusDemo(id, 'FINALIZADA');
    }

    return this.http
      .patch<any>(`${this.apiUrl}/reservas/${id}/finalizar`, {})
      .pipe(map((reservaBackend) => this.converterReservaBackendParaFrontend(reservaBackend)));
  }

  excluirReserva(id: number): Observable<void> {
    if (this.authService.estaEmModoDemo()) {
      const reservas = this.demoDataService.obterReservas();

      const reservaExiste = reservas.some((reservaAtual) => reservaAtual.id === id);

      if (!reservaExiste) {
        return throwError(() => ({
          error: {
            mensagem: 'Reserva não encontrada.',
          },
        }));
      }

      const reservasAtualizadas = reservas.filter((reservaAtual) => reservaAtual.id !== id);

      this.demoDataService.salvarReservas(reservasAtualizadas);

      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/reservas/${id}`);
  }

  gerarProximoId(): number {
    if (this.authService.estaEmModoDemo()) {
      return this.gerarProximoIdDemo(this.demoDataService.obterReservas());
    }

    return 0;
  }

  private alterarStatusDemo(id: number, status: Reserva['status']): Observable<Reserva> {
    const reservas = this.demoDataService.obterReservas();

    const reserva = reservas.find((reservaAtual) => reservaAtual.id === id);

    if (!reserva) {
      return throwError(() => ({
        error: {
          mensagem: 'Reserva não encontrada.',
        },
      }));
    }

    if (reserva.status === 'CANCELADA' && status === 'CONFIRMADA') {
      return throwError(() => ({
        error: {
          mensagem: 'Não é possível confirmar uma reserva cancelada.',
        },
      }));
    }

    if (reserva.status === 'FINALIZADA' && status === 'CONFIRMADA') {
      return throwError(() => ({
        error: {
          mensagem: 'Não é possível confirmar uma reserva finalizada.',
        },
      }));
    }

    const reservaAtualizada: Reserva = {
      ...reserva,
      status,
    };

    const reservasAtualizadas = reservas.map((reservaAtual) =>
      reservaAtual.id === id ? reservaAtualizada : reservaAtual,
    );

    this.demoDataService.salvarReservas(reservasAtualizadas);

    return of(reservaAtualizada);
  }

  private gerarProximoIdDemo(reservas: Reserva[]): number {
    if (reservas.length === 0) {
      return 1;
    }

    const maiorId = Math.max(...reservas.map((reserva) => reserva.id));

    return maiorId + 1;
  }

  private converterReservaBackendParaFrontend(reservaBackend: any): Reserva {
    return {
      id: reservaBackend.id,
      cliente: reservaBackend.cliente?.nome ?? 'Cliente não informado',
      mesa: reservaBackend.mesa?.numero
        ? `Mesa ${String(reservaBackend.mesa.numero).padStart(2, '0')}`
        : 'Mesa não informada',
      data: this.formatarDataBackendParaFrontend(reservaBackend.data),
      horario: `${this.formatarHora(reservaBackend.horaInicio)} - ${this.formatarHora(
        reservaBackend.horaFim,
      )}`,
      pessoas: reservaBackend.quantidadePessoas ?? 0,
      status: this.converterStatusBackendParaFrontend(reservaBackend.status),
      observacao: reservaBackend.observacao || undefined,
    };
  }

  private converterStatusBackendParaFrontend(statusBackend: string): Reserva['status'] {
    if (statusBackend === 'PENDENTE') {
      return 'AGENDADA';
    }

    if (statusBackend === 'CONFIRMADA') {
      return 'CONFIRMADA';
    }

    if (statusBackend === 'CANCELADA') {
      return 'CANCELADA';
    }

    if (statusBackend === 'FINALIZADA') {
      return 'FINALIZADA';
    }

    if (statusBackend === 'NO_SHOW') {
      return 'NO_SHOW';
    }

    return 'AGENDADA';
  }

  private formatarDataBackendParaFrontend(data: string): string {
    if (!data) {
      return '';
    }

    const [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
  }

  private converterDataFrontendParaBackend(data: string): string {
    if (!data) {
      return '';
    }

    if (data.includes('-')) {
      return data;
    }

    const [dia, mes, ano] = data.split('/');

    return `${ano}-${mes}-${dia}`;
  }

  private formatarHora(hora: string): string {
    if (!hora) {
      return '';
    }

    return hora.substring(0, 5);
  }

  private extrairHoraInicio(horario: string): string {
    return horario.split('-')[0].trim();
  }

  private extrairHoraFim(horario: string): string {
    return horario.split('-')[1].trim();
  }

  private normalizarHoraParaBackend(hora: string): string {
    if (!hora) {
      return '';
    }

    if (hora.length === 5) {
      return `${hora}:00`;
    }

    return hora;
  }
}
