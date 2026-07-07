import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Restaurante } from '../../core/models/restaurante.model';
import { RestauranteService } from '../../core/services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  imports: [Sidebar, FormsModule, RouterLink],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.scss',
})
export class Restaurantes implements OnInit {
  restaurantes: Restaurante[] = [];
  restaurantesFiltrados: Restaurante[] = [];

  filtroNome = '';
  filtroStatus = '';

  constructor(
    private restauranteService: RestauranteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarRestaurantes();
  }

  carregarRestaurantes(): void {
    this.restauranteService.listarRestaurantes().subscribe({
      next: (resposta: any) => {
        console.log('Resposta vinda do backend:', resposta);

        const lista = Array.isArray(resposta) ? resposta : (resposta?.content ?? []);

        this.restaurantes = lista.map((restaurante: any) => ({
          ...restaurante,
          status: restaurante.status ?? 'ATIVO',
          mesas: restaurante.mesas ?? 0,
        }));

        this.restaurantesFiltrados = [...this.restaurantes];

        console.log('Restaurantes carregados:', this.restaurantes);
        console.log('Restaurantes filtrados:', this.restaurantesFiltrados);

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar restaurantes:', erro);
      },
    });
  }

  aplicarFiltros(): void {
    const nomeFiltro = this.filtroNome.toLowerCase().trim();

    this.restaurantesFiltrados = this.restaurantes.filter((restaurante) => {
      const nome = restaurante.nome?.toLowerCase() ?? '';

      const nomeCorresponde = nome.includes(nomeFiltro);

      const statusCorresponde = this.filtroStatus ? restaurante.status === this.filtroStatus : true;

      return nomeCorresponde && statusCorresponde;
    });

    this.cdr.detectChanges();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroStatus = '';
    this.restaurantesFiltrados = [...this.restaurantes];

    this.cdr.detectChanges();
  }

  excluirRestaurante(restaurante: Restaurante): void {
    const confirmarExclusao = confirm(`Deseja realmente excluir ${restaurante.nome}?`);

    if (!confirmarExclusao) {
      return;
    }

    this.restauranteService.excluirRestaurante(restaurante.id).subscribe({
      next: () => {
        this.carregarRestaurantes();
      },
      error: (erro) => {
        console.error('Erro ao excluir restaurante:', erro);
      },
    });
  }

  getStatusLabel(status: Restaurante['status'] | undefined): string {
    const labels: Record<string, string> = {
      ATIVO: 'Ativo',
      INATIVO: 'Inativo',
      MANUTENCAO: 'Manutenção',
    };

    return labels[status ?? 'ATIVO'] ?? 'Ativo';
  }

  getStatusClass(status: Restaurante['status'] | undefined): string {
    const classes: Record<string, string> = {
      ATIVO: 'active',
      INATIVO: 'inactive',
      MANUTENCAO: 'maintenance',
    };

    return classes[status ?? 'ATIVO'] ?? 'active';
  }
}
