package com.brunno.mesalivre.dto.auth;

import com.brunno.mesalivre.enums.PerfilUsuario;

public record UsuarioResponse(
        Long id,
        String nome,
        String email,
        PerfilUsuario perfil
) {
}