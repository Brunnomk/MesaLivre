import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Restaurante, RestauranteStatus } from '../../core/models/restaurante.model';
import { RestauranteService } from '../../core/services/restaurante.service';

@Component({
  selector: 'app-novo-restaurante',
  imports: [Sidebar, RouterLink, FormsModule],
  templateUrl: './novo-restaurante.html',
  styleUrl: './novo-restaurante.scss',
})
export class NovoRestaurante {
  nome = '';
  endereco = '';
  telefone = '';
  mesas: number | null = null;
  status: RestauranteStatus | '' = '';

  formularioEnviado = false;
  salvando = false;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router,
  ) {}

  salvarRestaurante(): void {
    this.formularioEnviado = true;

    if (this.formularioInvalido()) {
      return;
    }

    this.salvando = true;

    const novoRestaurante: Restaurante = {
      id: 0,
      nome: this.nome.trim(),
      endereco: this.endereco.trim(),
      telefone: this.telefone.trim(),
      mesas: Number(this.mesas),
      status: this.status as RestauranteStatus,
    };

    this.restauranteService.adicionarRestaurante(novoRestaurante).subscribe({
      next: () => {
        this.salvando = false;
        void this.router.navigate(['/restaurantes']);
      },
      error: (erro) => {
        this.salvando = false;
        console.error('Erro ao salvar restaurante:', erro);
        alert('Erro ao salvar restaurante. Verifique o console.');
      },
    });
  }

  campoInvalido(valor: string | number | null): boolean {
    return this.formularioEnviado && !valor;
  }

  textoInvalido(valor: string): boolean {
    return this.formularioEnviado && !valor.trim();
  }

  mesasInvalido(): boolean {
    return this.formularioEnviado && (!this.mesas || this.mesas < 1);
  }

  statusInvalido(): boolean {
    return this.formularioEnviado && !this.status;
  }

  formularioInvalido(): boolean {
    return (
      !this.nome.trim() ||
      !this.endereco.trim() ||
      !this.telefone.trim() ||
      !this.mesas ||
      this.mesas < 1 ||
      !this.status
    );
  }
}
