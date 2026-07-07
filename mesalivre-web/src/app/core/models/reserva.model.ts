export type ReservaStatus = 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA' | 'FINALIZADA' | 'NO_SHOW';

export interface Reserva {
  id: number;
  cliente: string;
  mesa: string;
  data: string;
  horario: string;
  pessoas: number;
  status: ReservaStatus;
  observacao?: string;
}
