package com.example.demo.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserModel;
import com.example.demo.repository.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class UserService {

    private final String SECRET_KEY = "ArenaMatch_Chave_Super_Secreta_E_Muito_Longa_Para_Seguranca_2024";
    
    @Autowired
    private UserRepository userRepository;

    public UserModel cadastrarUsuario(UserModel usuario) {
        Optional<UserModel> usuarioOpt = userRepository.findByEmail(usuario.getEmail());
        if (usuarioOpt.isPresent()) {
            throw new RuntimeException("E-mail já cadastrado: " + usuario.getEmail());
        }
        return userRepository.save(usuario);
    }

    public String realizarLogin(String email, String senha) {
        Optional<UserModel> usuarioOpt = userRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            UserModel usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(senha)) {
                return gerarToken(usuario);
            }
       }
       return null;
    }

    private String gerarToken(UserModel usuario) {
        var key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(usuario.getEmail()) // Identidade do dono do token
                .claim("id", usuario.getId())   // Dados extras (payload)
                .claim("nome", usuario.getNome())
                .setIssuedAt(new Date())        // Data de criação
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Expira em 1 dia
                .signWith(key) // Agora passamos apenas a chave preparada
                .compact();
    }
}