package com.brunno.mesalivre.service;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class SenhaService {

    private static final int ITERACOES = 65536;
    private static final int TAMANHO_CHAVE = 256;
    private static final int TAMANHO_SALT = 16;

    public String gerarHash(String senha) {
        try {
            byte[] salt = gerarSalt();
            byte[] hash = gerarHashComSalt(senha, salt);

            return ITERACOES + ":" +
                    Base64.getEncoder().encodeToString(salt) + ":" +
                    Base64.getEncoder().encodeToString(hash);

        } catch (Exception exception) {
            throw new RuntimeException("Erro ao proteger a senha.");
        }
    }

    public boolean senhaCorresponde(String senhaInformada, String senhaSalva) {
        try {
            String[] partes = senhaSalva.split(":");

            int iteracoes = Integer.parseInt(partes[0]);
            byte[] salt = Base64.getDecoder().decode(partes[1]);
            byte[] hashSalvo = Base64.getDecoder().decode(partes[2]);

            byte[] hashInformado = gerarHashComSalt(senhaInformada, salt, iteracoes);

            return compararHashes(hashSalvo, hashInformado);

        } catch (Exception exception) {
            return false;
        }
    }

    private byte[] gerarSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[TAMANHO_SALT];
        secureRandom.nextBytes(salt);
        return salt;
    }

    private byte[] gerarHashComSalt(String senha, byte[] salt) throws Exception {
        return gerarHashComSalt(senha, salt, ITERACOES);
    }

    private byte[] gerarHashComSalt(String senha, byte[] salt, int iteracoes) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(
                senha.toCharArray(),
                salt,
                iteracoes,
                TAMANHO_CHAVE
        );

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");

        return factory.generateSecret(spec).getEncoded();
    }

    private boolean compararHashes(byte[] hashSalvo, byte[] hashInformado) {
        if (hashSalvo.length != hashInformado.length) {
            return false;
        }

        int diferenca = 0;

        for (int i = 0; i < hashSalvo.length; i++) {
            diferenca |= hashSalvo[i] ^ hashInformado[i];
        }

        return diferenca == 0;
    }
}