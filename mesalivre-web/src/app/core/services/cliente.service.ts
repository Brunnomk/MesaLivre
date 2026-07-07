import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { AuthService } from './auth.service';
import { DemoDataService } from './demo-data.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl = 'http://mesalivre-web/src/api/clientes';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private demoDataService: DemoDataService,
  ) {}

  listarClientes(): Observable<Cliente[]> {
    if (this.authService.estaEmModoDemo()) {
      return of(this.demoDataService.obterClientes());
    }

    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((clientesBackend) =>
          clientesBackend.map((clienteBackend) =>
            this.converterClienteBackendParaFrontend(clienteBackend),
          ),
        ),
      );
  }

  adicionarCliente(cliente: Cliente): Observable<Cliente> {
    if (this.authService.estaEmModoDemo()) {
      const clientes = this.demoDataService.obterClientes();

      const novoCliente: Cliente = {
        ...cliente,
        id: this.gerarProximoIdDemo(clientes),
        reservas: cliente.reservas ?? 0,
        status: cliente.status ?? 'ATIVO',
      };

      const clientesAtualizados = [novoCliente, ...clientes];

      this.demoDataService.salvarClientes(clientesAtualizados);

      return of(novoCliente);
    }

    const payload = {
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
    };

    return this.http
      .post<any>(this.apiUrl, payload)
      .pipe(map((clienteBackend) => this.converterClienteBackendParaFrontend(clienteBackend)));
  }

  excluirCliente(id: number): Observable<void> {
    if (this.authService.estaEmModoDemo()) {
      const reservas = this.demoDataService.obterReservas();
      const clientes = this.demoDataService.obterClientes();

      const cliente = clientes.find((clienteAtual) => clienteAtual.id === id);

      if (!cliente) {
        return throwError(() => ({
          error: {
            mensagem: 'Cliente não encontrado.',
          },
        }));
      }

      const clientePossuiReservas = reservas.some((reserva) => reserva.cliente === cliente.nome);

      if (clientePossuiReservas) {
        return throwError(() => ({
          error: {
            mensagem: 'Não é possível excluir este cliente porque existem reservas associadas.',
          },
        }));
      }

      const clientesAtualizados = clientes.filter((clienteAtual) => clienteAtual.id !== id);

      this.demoDataService.salvarClientes(clientesAtualizados);

      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  gerarProximoId(): number {
    if (this.authService.estaEmModoDemo()) {
      return this.gerarProximoIdDemo(this.demoDataService.obterClientes());
    }

    return 0;
  }

  private gerarProximoIdDemo(clientes: Cliente[]): number {
    if (clientes.length === 0) {
      return 1;
    }

    const maiorId = Math.max(...clientes.map((cliente) => cliente.id));

    return maiorId + 1;
  }

  private converterClienteBackendParaFrontend(clienteBackend: any): Cliente {
    return {
      id: clienteBackend.id,
      nome: clienteBackend.nome,
      telefone: clienteBackend.telefone,
      email: clienteBackend.email,
      reservas: clienteBackend.reservas ?? 0,
      status: clienteBackend.status ?? 'ATIVO',
    };
  }
}
