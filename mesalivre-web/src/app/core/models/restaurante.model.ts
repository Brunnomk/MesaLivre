export type RestauranteStatus = 'ATIVO' | 'INATIVO' | 'MANUTENCAO';

export interface Restaurante {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email?: string | null;
  mesas: number;
  status: RestauranteStatus;
}
