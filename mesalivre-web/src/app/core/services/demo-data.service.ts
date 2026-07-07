import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Mesa } from '../models/mesa.model';
import { Restaurante } from '../models/restaurante.model';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root',
})
export class DemoDataService {
  private readonly restaurantesKey = 'demo_restaurantes';
  private readonly mesasKey = 'demo_mesas';
  private readonly clientesKey = 'demo_clientes';
  private readonly reservasKey = 'demo_reservas';

  obterRestaurantes(): Restaurante[] {
    return this.obterOuCriar(this.restaurantesKey, this.restaurantesIniciais());
  }

  salvarRestaurantes(restaurantes: Restaurante[]): void {
    localStorage.setItem(this.restaurantesKey, JSON.stringify(restaurantes));
  }

  obterMesas(): Mesa[] {
    return this.obterOuCriar(this.mesasKey, this.mesasIniciais());
  }

  salvarMesas(mesas: Mesa[]): void {
    localStorage.setItem(this.mesasKey, JSON.stringify(mesas));
  }

  obterClientes(): Cliente[] {
    return this.obterOuCriar(this.clientesKey, this.clientesIniciais());
  }

  salvarClientes(clientes: Cliente[]): void {
    localStorage.setItem(this.clientesKey, JSON.stringify(clientes));
  }

  obterReservas(): Reserva[] {
    return this.obterOuCriar(this.reservasKey, this.reservasIniciais());
  }

  salvarReservas(reservas: Reserva[]): void {
    localStorage.setItem(this.reservasKey, JSON.stringify(reservas));
  }

  resetarDemo(): void {
    localStorage.removeItem(this.restaurantesKey);
    localStorage.removeItem(this.mesasKey);
    localStorage.removeItem(this.clientesKey);
    localStorage.removeItem(this.reservasKey);
  }

  private obterOuCriar<T>(chave: string, dadosIniciais: T[]): T[] {
    const dadosSalvos = localStorage.getItem(chave);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos) as T[];
    }

    localStorage.setItem(chave, JSON.stringify(dadosIniciais));
    return dadosIniciais;
  }

  private restaurantesIniciais(): Restaurante[] {
    return [
      {
        id: 1,
        nome: 'MesaLivre Centro',
        endereco: 'Rua Principal, 120',
        telefone: '+351 266 123 456',
        email: 'centro@mesalivre.demo',
        mesas: 12,
        status: 'ATIVO',
      },
      {
        id: 2,
        nome: 'MesaLivre Jardim',
        endereco: 'Avenida das Flores, 45',
        telefone: '+351 266 987 654',
        email: 'jardim@mesalivre.demo',
        mesas: 8,
        status: 'ATIVO',
      },
      {
        id: 3,
        nome: 'MesaLivre Plaza',
        endereco: 'Praça Central, 10',
        telefone: '+351 266 555 777',
        email: 'plaza@mesalivre.demo',
        mesas: 6,
        status: 'MANUTENCAO',
      },
    ];
  }

  private mesasIniciais(): Mesa[] {
    return [
      {
        id: 1,
        nome: 'Mesa 01',
        tipo: 'MESA',
        capacidade: 2,
        status: 'DISPONIVEL',
        localizacao: 'Salão principal',
      },
      {
        id: 2,
        nome: 'Mesa 04',
        tipo: 'MESA',
        capacidade: 4,
        status: 'RESERVADA',
        localizacao: 'Área interna',
      },
      {
        id: 3,
        nome: 'Mesa 08',
        tipo: 'MESA',
        capacidade: 3,
        status: 'OCUPADA',
        localizacao: 'Próxima à janela',
      },
      {
        id: 4,
        nome: 'Mesa 12',
        tipo: 'MESA',
        capacidade: 4,
        status: 'DISPONIVEL',
        localizacao: 'Varanda',
      },
      {
        id: 5,
        nome: 'Sala VIP',
        tipo: 'SALA',
        capacidade: 8,
        status: 'DISPONIVEL',
        localizacao: 'Área reservada',
      },
      {
        id: 6,
        nome: 'Mesa 15',
        tipo: 'MESA',
        capacidade: 6,
        status: 'INATIVA',
        localizacao: 'Manutenção',
      },
    ];
  }

  private clientesIniciais(): Cliente[] {
    return [
      {
        id: 1,
        nome: 'João Silva',
        telefone: '+351 912 345 678',
        email: 'joao.silva@demo.com',
        reservas: 8,
        status: 'ATIVO',
      },
      {
        id: 2,
        nome: 'Maria Santos',
        telefone: '+351 923 456 789',
        email: 'maria.santos@demo.com',
        reservas: 12,
        status: 'VIP',
      },
      {
        id: 3,
        nome: 'Carlos Pereira',
        telefone: '+351 934 567 890',
        email: 'carlos.pereira@demo.com',
        reservas: 5,
        status: 'ATIVO',
      },
      {
        id: 4,
        nome: 'Ana Costa',
        telefone: '+351 945 678 901',
        email: 'ana.costa@demo.com',
        reservas: 3,
        status: 'ATIVO',
      },
    ];
  }

  private reservasIniciais(): Reserva[] {
    return [
      {
        id: 1,
        cliente: 'João Silva',
        mesa: 'Mesa 12',
        data: '12/06/2026',
        horario: '19:30 - 21:00',
        pessoas: 4,
        status: 'CONFIRMADA',
        observacao: 'Cliente pediu mesa próxima à janela',
      },
      {
        id: 2,
        cliente: 'Maria Santos',
        mesa: 'Mesa 04',
        data: '12/06/2026',
        horario: '20:00 - 21:30',
        pessoas: 2,
        status: 'AGENDADA',
      },
      {
        id: 3,
        cliente: 'Carlos Pereira',
        mesa: 'Sala VIP',
        data: '12/06/2026',
        horario: '21:00 - 23:00',
        pessoas: 8,
        status: 'CONFIRMADA',
        observacao: 'Reserva para comemoração especial',
      },
      {
        id: 4,
        cliente: 'Ana Costa',
        mesa: 'Mesa 08',
        data: '13/06/2026',
        horario: '18:30 - 20:00',
        pessoas: 3,
        status: 'CANCELADA',
      },
    ];
  }
}
