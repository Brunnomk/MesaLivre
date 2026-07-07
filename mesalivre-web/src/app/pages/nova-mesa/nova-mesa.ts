import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Mesa, MesaStatus, MesaTipo } from '../../core/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-nova-mesa',
  imports: [Sidebar, RouterLink, FormsModule],
  templateUrl: './nova-mesa.html',
  styleUrl: './nova-mesa.scss',
})
export class NovaMesa {
  nome = '';
  tipo: MesaTipo | '' = '';
  capacidade: number | null = null;
  status: MesaStatus | '' = '';
  localizacao = '';

  formularioEnviado = false;
  salvando = false;

  constructor(
    private mesaService: MesaService,
    private router: Router,
  ) {}

  salvarMesa(): void {
    this.formularioEnviado = true;

    if (this.formularioInvalido()) {
      return;
    }

    this.salvando = true;

    const novaMesa: Mesa = {
      id: 0,
      nome: this.nome.trim(),
      tipo: this.tipo as MesaTipo,
      capacidade: Number(this.capacidade),
      status: this.status as MesaStatus,
      localizacao: this.localizacao.trim(),
    };

    this.mesaService.adicionarMesa(novaMesa).subscribe({
      next: () => {
        this.salvando = false;
        void this.router.navigate(['/mesas']);
      },
      error: (erro) => {
        this.salvando = false;
        console.error('Erro ao salvar mesa:', erro);
        alert('Erro ao salvar mesa. Verifique o console.');
      },
    });
  }

  campoInvalido(valor: string | number | null): boolean {
    return this.formularioEnviado && !valor;
  }

  capacidadeInvalida(): boolean {
    return this.formularioEnviado && (!this.capacidade || this.capacidade < 1);
  }

  formularioInvalido(): boolean {
    return (
      !this.nome.trim() ||
      !this.tipo ||
      !this.capacidade ||
      this.capacidade < 1 ||
      !this.status ||
      !this.localizacao.trim()
    );
  }
}
