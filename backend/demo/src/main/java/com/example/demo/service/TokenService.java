package com.example.demo.service;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    // A chave DEVE ser identica à do UserService
    private final String SECRET_KEY = "ArenaMatch_Chave_Super_Secreta_E_Muito_Longa_Para_Seguranca_2024";

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // Método para validar e extrair o e-mail do token
    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject(); // Retorna o email do usuário
        } catch (Exception e) {
            return null; // Token inválido ou expirado
        }
    }
}