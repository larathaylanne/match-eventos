package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserModel;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository usuarioRepository;

    public UserModel cadastrarUsuario(UserModel usuario) {
        // Regra de negócio simples: salvar o usuário no banco
        return usuarioRepository.save(usuario);
    }
}