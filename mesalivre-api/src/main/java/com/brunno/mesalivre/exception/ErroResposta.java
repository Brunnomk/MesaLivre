package com.brunno.mesalivre.exception;

import java.time.LocalDateTime;

public record ErroResposta(
        LocalDateTime timestamp,
        Integer status,
        String erro,
        String mensagem,
        String caminho
) {
}