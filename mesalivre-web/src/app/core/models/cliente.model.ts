export type ClienteStatus = 'ATIVO' | 'INATIVO' | 'VIP';

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  reservas: number;
  status: ClienteStatus;
}
