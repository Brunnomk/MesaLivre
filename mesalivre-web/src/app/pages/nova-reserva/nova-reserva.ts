import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Reserva } from '../../core/models/reserva.model';
import { Cliente } from '../../core/models/cliente.model';
import { Mesa } from '../../core/models/mesa.model';
import { ReservaService } from '../../core/services/reserva.service';
import { ClienteService } from '../../core/services/cliente.service';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-nova-reserva',
  imports: [Sidebar, RouterLink, FormsModule],
  templateUrl: './nova-reserva.html',
  styleUrl: './nova-reserva.scss',
})
export class NovaReserva implements OnInit {
  clientes: Cliente[] = [];
  mesas: Mesa[] = [];

  cliente = '';
  mesa = '';
  data = '';
  horaInicio = '';
  horaFim = '';
  pessoas: number | null = null;
  observacao = '';

  formularioEnviado = false;
  salvando = false;
  dataMinima = this.getDataAtualInput();

  constructor(
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private mesaService: MesaService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarMesas();
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes na nova reserva:', erro);
      },
    });
  }

  carregarMesas(): void {
    this.mesaService.listarMesas().subscribe({
      next: (mesas) => {
        this.mesas = mesas;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar mesas na nova reserva:', erro);
      },
    });
  }

  salvarReserva(): void {
    this.formularioEnviado = true;

    if (this.formularioInvalido()) {
      return;
    }

    const clienteSelecionado = this.getClienteSelecionado();
    const mesaSelecionada = this.getMesaSelecionada();

    if (!clienteSelecionado || !mesaSelecionada) {
      alert('Selecione um cliente e uma mesa válidos.');
      return;
    }

    this.salvando = true;

    const restauranteId = 1;

    const novaReserva: Reserva = {
      id: 0,
      cliente: this.cliente,
      mesa: this.mesa,
      data: this.formatarData(this.data),
      horario: `${this.horaInicio} - ${this.horaFim}`,
      pessoas: Number(this.pessoas),
      status: 'AGENDADA',
      observacao: this.observacao.trim() || undefined,
    };

    this.reservaService
      .adicionarReserva(novaReserva, restauranteId, mesaSelecionada.id, clienteSelecionado.id)
      .subscribe({
        next: () => {
          this.salvando = false;
          void this.router.navigate(['/reservas']);
        },
        error: (erro) => {
          this.salvando = false;
          console.error('Erro ao salvar reserva:', erro);

          const mensagem =
            this.obterMensagemErro(erro) ||
            'Não foi possível salvar a reserva. Verifique se a mesa já possui reserva no horário informado.';

          alert(mensagem);
        },
      });
  }

  campoInvalido(valor: string | number | null): boolean {
    return this.formularioEnviado && !valor;
  }

  pessoasInvalido(): boolean {
    return this.formularioEnviado && (!this.pessoas || this.pessoas < 1);
  }

  horarioInvalido(): boolean {
    if (!this.horaInicio || !this.horaFim) {
      return false;
    }

    return this.horaFim <= this.horaInicio;
  }

  dataPassada(): boolean {
    if (!this.data) {
      return false;
    }

    return this.data < this.getDataAtualInput();
  }

  horaInicioPassada(): boolean {
    if (!this.data || !this.horaInicio) {
      return false;
    }

    const dataAtual = this.getDataAtualInput();
    const horaAtual = this.getHoraAtualInput();

    return this.data === dataAtual && this.horaInicio <= horaAtual;
  }

  capacidadeMesaExcedida(): boolean {
    const mesaSelecionada = this.getMesaSelecionada();

    if (!mesaSelecionada || !this.pessoas) {
      return false;
    }

    return this.pessoas > mesaSelecionada.capacidade;
  }

  getCapacidadeMesaSelecionada(): number | null {
    const mesaSelecionada = this.getMesaSelecionada();

    return mesaSelecionada ? mesaSelecionada.capacidade : null;
  }

  formularioInvalido(): boolean {
    return (
      !this.cliente ||
      !this.mesa ||
      !this.data ||
      !this.horaInicio ||
      !this.horaFim ||
      !this.pessoas ||
      this.pessoas < 1 ||
      this.dataPassada() ||
      this.horaInicioPassada() ||
      this.horarioInvalido() ||
      this.capacidadeMesaExcedida()
    );
  }

  private getClienteSelecionado(): Cliente | undefined {
    return this.clientes.find((cliente) => cliente.nome === this.cliente);
  }

  private getMesaSelecionada(): Mesa | undefined {
    return this.mesas.find((mesa) => mesa.nome === this.mesa);
  }

  private formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  private getDataAtualInput(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  private getHoraAtualInput(): string {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    return `${horas}:${minutos}`;
  }

  private obterMensagemErro(erro: any): string | null {
    if (typeof erro?.error === 'string') {
      return erro.error;
    }

    if (erro?.error?.mensagem) {
      return erro.error.mensagem;
    }

    if (erro?.error?.message) {
      return erro.error.message;
    }

    if (erro?.message) {
      return erro.message;
    }

    return null;
  }
}
