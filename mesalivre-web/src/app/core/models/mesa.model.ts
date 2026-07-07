export type MesaTipo = 'MESA' | 'SALA';

export type MesaStatus = 'DISPONIVEL' | 'RESERVADA' | 'OCUPADA' | 'INATIVA';

export interface Mesa {
  id: number;
  nome: string;
  tipo: MesaTipo;
  capacidade: number;
  status: MesaStatus;
  localizacao: string;
}
