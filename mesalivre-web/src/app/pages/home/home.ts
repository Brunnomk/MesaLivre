import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UsuarioLogado } from '../../core/services/auth.service';
import { DemoDataService } from '../../core/services/demo-data.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    private authService: AuthService,
    private demoDataService: DemoDataService,
    private router: Router,
  ) {}

  entrarDemonstracao(): void {
    this.demoDataService.resetarDemo();

    const usuarioDemo: UsuarioLogado = {
      id: 0,
      nome: 'Demonstração',
      email: 'demo@mesalivre.com',
      perfil: 'ADMIN',
    };

    this.authService.salvarSessao(usuarioDemo, true);

    void this.router.navigate(['/dashboard']);
  }
}
