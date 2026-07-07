import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Restaurante } from '../models/restaurante.model';
import { AuthService } from './auth.service';
import { DemoDataService } from './demo-data.service';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  private readonly apiUrl = 'http://mesalivre-web/src/api/restaurantes';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private demoDataService: DemoDataService,
  ) {}

  listarRestaurantes(): Observable<Restaurante[]> {
    if (this.authService.estaEmModoDemo()) {
      return of(this.demoDataService.obterRestaurantes());
    }

    return this.http.get<Restaurante[]>(this.apiUrl).pipe(
      map((restaurantes) =>
        restaurantes.map((restaurante) => ({
          ...restaurante,
          mesas: restaurante.mesas ?? 0,
          status: restaurante.status ?? 'ATIVO',
        })),
      ),
    );
  }

  buscarRestaurantePorId(id: number): Observable<Restaurante> {
    if (this.authService.estaEmModoDemo()) {
      const restaurante = this.demoDataService
        .obterRestaurantes()
        .find((restauranteAtual) => restauranteAtual.id === id);

      if (!restaurante) {
        return throwError(() => ({
          error: {
            mensagem: 'Restaurante não encontrado.',
          },
        }));
      }

      return of(restaurante);
    }

    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`).pipe(
      map((restaurante) => ({
        ...restaurante,
        mesas: restaurante.mesas ?? 0,
        status: restaurante.status ?? 'ATIVO',
      })),
    );
  }

  adicionarRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    if (this.authService.estaEmModoDemo()) {
      const restaurantes = this.demoDataService.obterRestaurantes();

      const novoRestaurante: Restaurante = {
        ...restaurante,
        id: this.gerarProximoIdDemo(restaurantes),
        nome: restaurante.nome.trim(),
        endereco: restaurante.endereco.trim(),
        telefone: restaurante.telefone.trim(),
        email: restaurante.email?.trim() ?? null,
        mesas: restaurante.mesas ?? 0,
        status: restaurante.status ?? 'ATIVO',
      };

      const restaurantesAtualizados = [novoRestaurante, ...restaurantes];

      this.demoDataService.salvarRestaurantes(restaurantesAtualizados);

      return of(novoRestaurante);
    }

    const payload = {
      nome: restaurante.nome,
      endereco: restaurante.endereco,
      telefone: restaurante.telefone,
      email: restaurante.email ?? null,
    };

    return this.http.post<Restaurante>(this.apiUrl, payload).pipe(
      map((restauranteCriado) => ({
        ...restauranteCriado,
        mesas: restauranteCriado.mesas ?? 0,
        status: restauranteCriado.status ?? 'ATIVO',
      })),
    );
  }

  atualizarRestaurante(id: number, restaurante: Restaurante): Observable<Restaurante> {
    if (this.authService.estaEmModoDemo()) {
      const restaurantes = this.demoDataService.obterRestaurantes();

      const restauranteExiste = restaurantes.some((restauranteAtual) => restauranteAtual.id === id);

      if (!restauranteExiste) {
        return throwError(() => ({
          error: {
            mensagem: 'Restaurante não encontrado.',
          },
        }));
      }

      const restauranteAtualizado: Restaurante = {
        ...restaurante,
        id,
        nome: restaurante.nome.trim(),
        endereco: restaurante.endereco.trim(),
        telefone: restaurante.telefone.trim(),
        email: restaurante.email?.trim() ?? null,
        mesas: restaurante.mesas ?? 0,
        status: restaurante.status ?? 'ATIVO',
      };

      const restaurantesAtualizados = restaurantes.map((restauranteAtual) =>
        restauranteAtual.id === id ? restauranteAtualizado : restauranteAtual,
      );

      this.demoDataService.salvarRestaurantes(restaurantesAtualizados);

      return of(restauranteAtualizado);
    }

    const payload = {
      nome: restaurante.nome,
      endereco: restaurante.endereco,
      telefone: restaurante.telefone,
      email: restaurante.email ?? null,
    };

    return this.http.put<Restaurante>(`${this.apiUrl}/${id}`, payload).pipe(
      map((restauranteAtualizado) => ({
        ...restauranteAtualizado,
        mesas: restauranteAtualizado.mesas ?? 0,
        status: restauranteAtualizado.status ?? 'ATIVO',
      })),
    );
  }

  excluirRestaurante(id: number): Observable<void> {
    if (this.authService.estaEmModoDemo()) {
      const restaurantes = this.demoDataService.obterRestaurantes();

      const restauranteExiste = restaurantes.some((restauranteAtual) => restauranteAtual.id === id);

      if (!restauranteExiste) {
        return throwError(() => ({
          error: {
            mensagem: 'Restaurante não encontrado.',
          },
        }));
      }

      const restaurantesAtualizados = restaurantes.filter(
        (restauranteAtual) => restauranteAtual.id !== id,
      );

      this.demoDataService.salvarRestaurantes(restaurantesAtualizados);

      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  gerarProximoId(): number {
    if (this.authService.estaEmModoDemo()) {
      return this.gerarProximoIdDemo(this.demoDataService.obterRestaurantes());
    }

    return 0;
  }

  private gerarProximoIdDemo(restaurantes: Restaurante[]): number {
    if (restaurantes.length === 0) {
      return 1;
    }

    const maiorId = Math.max(...restaurantes.map((restaurante) => restaurante.id));

    return maiorId + 1;
  }
}
