package com.brunno.mesalivre.dto.auth;

public record LoginRequest(
        String email,
        String senha
) {
}