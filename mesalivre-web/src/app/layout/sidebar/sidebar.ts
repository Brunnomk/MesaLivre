import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DemoDataService } from '../../core/services/demo-data.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuAberto = false;

  constructor(
    private authService: AuthService,
    private demoDataService: DemoDataService,
    private router: Router,
  ) {}

  get nomeUsuarioLogado(): string {
    if (this.authService.estaEmModoDemo()) {
      return 'Demonstração';
    }

    const usuario = this.authService.obterUsuarioLogado();

    return usuario?.nome ?? 'Usuário';
  }

  abrirMenu(): void {
    this.menuAberto = true;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  sair(): void {
    if (this.authService.estaEmModoDemo()) {
      this.demoDataService.resetarDemo();
    }

    this.authService.sair();
    this.fecharMenu();

    void this.router.navigate(['/login']);
  }

  @HostListener('window:keydown.escape')
  fecharComEsc(): void {
    this.fecharMenu();
  }
}
