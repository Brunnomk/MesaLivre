import { Injectable } from '@angular/core';
import { Mesa } from '../models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeService {
  private mesas: Mesa[] = [
    {
      id: 1,
      nome: 'Mesa 01',
      tipo: 'MESA',
      capacidade: 2,
      status: 'DISPONIVEL',
      localizacao: 'Salão principal'
    },
    {
      id: 2,
      nome: 'Mesa 12',
      tipo: 'MESA',
      capacidade: 4,
      status: 'DISPONIVEL',
      localizacao: 'Salão principal'
    },
    {
      id: 3,
      nome: 'Mesa 04',
      tipo: 'MESA',
      capacidade: 4,
      status: 'RESERVADA',
      localizacao: 'Área interna'
    },
    {
      id: 4,
      nome: 'Sala VIP',
      tipo: 'SALA',
      capacidade: 8,
      status: 'DISPONIVEL',
      localizacao: 'Área reservada'
    },
    {
      id: 5,
      nome: 'Mesa 08',
      tipo: 'MESA',
      capacidade: 3,
      status: 'OCUPADA',
      localizacao: 'Próxima à janela'
    },
    {
      id: 6,
      nome: 'Mesa 15',
      tipo: 'MESA',
      capacidade: 6,
      status: 'INATIVA',
      localizacao: 'Manutenção'
    }
  ];

  consultarDisponibilidade(): Mesa[] {
    return this.mesas;
  }
}
