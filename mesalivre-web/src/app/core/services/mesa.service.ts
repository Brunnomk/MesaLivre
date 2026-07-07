import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Mesa } from '../models/mesa.model';
import { AuthService } from './auth.service';
import { DemoDataService } from './demo-data.service';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private readonly apiUrl = 'https://mesalivre-api.onrender.com/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private demoDataService: DemoDataService,
  ) {}

  listarMesas(): Observable<Mesa[]> {
    if (this.authService.estaEmModoDemo()) {
      return of(this.demoDataService.obterMesas());
    }

    return this.http
      .get<any[]>(`${this.apiUrl}/mesas`)
      .pipe(
        map((mesasBackend) =>
          mesasBackend.map((mesaBackend) => this.converterMesaBackendParaFrontend(mesaBackend)),
        ),
      );
  }

  adicionarMesa(mesa: Mesa): Observable<Mesa> {
    if (this.authService.estaEmModoDemo()) {
      const mesas = this.demoDataService.obterMesas();

      const novaMesa: Mesa = {
        ...mesa,
        id: this.gerarProximoIdDemo(mesas),
        nome: mesa.nome.trim(),
        tipo: mesa.tipo || 'MESA',
        capacidade: mesa.capacidade,
        status: mesa.status || 'DISPONIVEL',
        localizacao: mesa.localizacao.trim(),
      };

      const mesasAtualizadas = [novaMesa, ...mesas];

      this.demoDataService.salvarMesas(mesasAtualizadas);

      return of(novaMesa);
    }

    const restauranteId = 2;

    const payload = {
      numero: this.extrairNumeroDaMesa(mesa.nome),
      capacidade: mesa.capacidade,
      localizacao: mesa.localizacao,
      disponivel: mesa.status === 'DISPONIVEL',
    };

    return this.http
      .post<any>(`${this.apiUrl}/restaurantes/${restauranteId}/mesas`, payload)
      .pipe(map((mesaBackend) => this.converterMesaBackendParaFrontend(mesaBackend)));
  }

  excluirMesa(id: number): Observable<void> {
    if (this.authService.estaEmModoDemo()) {
      const mesas = this.demoDataService.obterMesas();
      const reservas = this.demoDataService.obterReservas();

      const mesa = mesas.find((mesaAtual) => mesaAtual.id === id);

      if (!mesa) {
        return throwError(() => ({
          error: {
            mensagem: 'Mesa não encontrada.',
          },
        }));
      }

      const mesaPossuiReservas = reservas.some((reserva) => reserva.mesa === mesa.nome);

      if (mesaPossuiReservas) {
        return throwError(() => ({
          error: {
            mensagem: 'Não é possível excluir esta mesa porque existem reservas associadas.',
          },
        }));
      }

      const mesasAtualizadas = mesas.filter((mesaAtual) => mesaAtual.id !== id);

      this.demoDataService.salvarMesas(mesasAtualizadas);

      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/mesas/${id}`);
  }

  gerarProximoId(): number {
    if (this.authService.estaEmModoDemo()) {
      return this.gerarProximoIdDemo(this.demoDataService.obterMesas());
    }

    return 0;
  }

  private gerarProximoIdDemo(mesas: Mesa[]): number {
    if (mesas.length === 0) {
      return 1;
    }

    const maiorId = Math.max(...mesas.map((mesa) => mesa.id));

    return maiorId + 1;
  }

  private converterMesaBackendParaFrontend(mesaBackend: any): Mesa {
    return {
      id: mesaBackend.id,
      nome: `Mesa ${String(mesaBackend.numero).padStart(2, '0')}`,
      tipo: 'MESA',
      capacidade: mesaBackend.capacidade,
      status: mesaBackend.disponivel ? 'DISPONIVEL' : 'INATIVA',
      localizacao: mesaBackend.localizacao,
    };
  }

  private extrairNumeroDaMesa(nome: string): number {
    const numeros = nome.match(/\d+/);

    if (!numeros) {
      return 1;
    }

    return Number(numeros[0]);
  }
}
