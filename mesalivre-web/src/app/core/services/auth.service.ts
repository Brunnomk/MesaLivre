import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CadastroUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  perfil: 'ADMIN';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dados: CadastroUsuarioRequest): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(`${this.apiUrl}/cadastro`, dados);
  }

  login(dados: LoginRequest): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(`${this.apiUrl}/login`, dados);
  }

  salvarSessao(usuario: UsuarioLogado, modoDemo = false): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    localStorage.setItem('modoDemo', String(modoDemo));
  }

  obterUsuarioLogado(): UsuarioLogado | null {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');

    if (!usuarioSalvo) {
      return null;
    }

    return JSON.parse(usuarioSalvo) as UsuarioLogado;
  }

  estaLogado(): boolean {
    return !!this.obterUsuarioLogado();
  }

  estaEmModoDemo(): boolean {
    return localStorage.getItem('modoDemo') === 'true';
  }

  sair(): void {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('modoDemo');
  }
}
