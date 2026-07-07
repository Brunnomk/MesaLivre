import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Reservas } from './pages/reservas/reservas';
import { NovaReserva } from './pages/nova-reserva/nova-reserva';
import { Mesas } from './pages/mesas/mesas';
import { NovaMesa } from './pages/nova-mesa/nova-mesa';
import { Clientes } from './pages/clientes/clientes';
import { NovoCliente } from './pages/novo-cliente/novo-cliente';
import { Restaurantes } from './pages/restaurantes/restaurantes';
import { NovoRestaurante } from './pages/novo-restaurante/novo-restaurante';
import { Disponibilidade } from './pages/disponibilidade/disponibilidade';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'reservas',
    component: Reservas,
    canActivate: [authGuard],
  },
  {
    path: 'reservas/nova',
    component: NovaReserva,
    canActivate: [authGuard],
  },
  {
    path: 'mesas',
    component: Mesas,
    canActivate: [authGuard],
  },
  {
    path: 'mesas/nova',
    component: NovaMesa,
    canActivate: [authGuard],
  },
  {
    path: 'clientes',
    component: Clientes,
    canActivate: [authGuard],
  },
  {
    path: 'clientes/novo',
    component: NovoCliente,
    canActivate: [authGuard],
  },
  {
    path: 'restaurantes',
    component: Restaurantes,
    canActivate: [authGuard],
  },
  {
    path: 'restaurantes/novo',
    component: NovoRestaurante,
    canActivate: [authGuard],
  },
  {
    path: 'disponibilidade',
    component: Disponibilidade,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
