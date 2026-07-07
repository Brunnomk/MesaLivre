package com.brunno.mesalivre.dto.auth;

public record CadastroUsuarioRequest(
        String nome,
        String email,
        String senha
) {
}