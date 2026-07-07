package com.brunno.mesalivre.service;

import com.brunno.mesalivre.dto.auth.CadastroUsuarioRequest;
import com.brunno.mesalivre.dto.auth.LoginRequest;
import com.brunno.mesalivre.dto.auth.UsuarioResponse;
import com.brunno.mesalivre.enums.PerfilUsuario;
import com.brunno.mesalivre.model.Usuario;
import com.brunno.mesalivre.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final SenhaService senhaService;

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    public UsuarioResponse cadastrar(CadastroUsuarioRequest request) {
        String nome = tratarTexto(request.nome());
        String email = tratarEmail(request.email());
        String senha = request.senha() == null ? "" : request.senha().trim();

        if (nome.isBlank()) {
            throw new RuntimeException("Informe o nome.");
        }

        if (email.isBlank() || !emailValido(email)) {
            throw new RuntimeException("Informe um e-mail válido.");
        }

        if (senha.length() < 6) {
            throw new RuntimeException("A senha deve ter pelo menos 6 caracteres.");
        }

        if (usuarioRepository.existsByEmail(email)) {
            throw new RuntimeException("Este e-mail já está cadastrado.");
        }

        Usuario usuario = Usuario.builder()
                .nome(nome)
                .email(email)
                .senha(senhaService.gerarHash(senha))
                .perfil(PerfilUsuario.ADMIN)
                .dataCriacao(LocalDateTime.now())
                .build();

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return converterParaResponse(usuarioSalvo);
    }

    public UsuarioResponse login(LoginRequest request) {
        String email = tratarEmail(request.email());
        String senha = request.senha() == null ? "" : request.senha();

        if (email.isBlank() || senha.isBlank()) {
            throw new RuntimeException("Informe e-mail e senha.");
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("E-mail ou senha inválidos."));

        boolean senhaCorreta = senhaService.senhaCorresponde(senha, usuario.getSenha());

        if (!senhaCorreta) {
            throw new RuntimeException("E-mail ou senha inválidos.");
        }

        return converterParaResponse(usuario);
    }

    private UsuarioResponse converterParaResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil()
        );
    }

    private String tratarTexto(String texto) {
        return texto == null ? "" : texto.trim();
    }

    private String tratarEmail(String email) {
        return email == null ? "" : email.trim().toLowerCase();
    }

    private boolean emailValido(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }
}