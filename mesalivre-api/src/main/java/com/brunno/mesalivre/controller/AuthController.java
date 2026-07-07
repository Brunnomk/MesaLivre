package com.brunno.mesalivre.controller;

import com.brunno.mesalivre.dto.auth.CadastroUsuarioRequest;
import com.brunno.mesalivre.dto.auth.LoginRequest;
import com.brunno.mesalivre.dto.auth.UsuarioResponse;
import com.brunno.mesalivre.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse cadastrar(@RequestBody CadastroUsuarioRequest request) {
        return authService.cadastrar(request);
    }

    @PostMapping("/login")
    public UsuarioResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}