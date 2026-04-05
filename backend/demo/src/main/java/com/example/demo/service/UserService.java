package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.UserModel;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserModel cadastrarUsuario(UserModel usuario) {
        return userRepository.save(usuario);
    }

    public UserModel realizarLogin(String email, String senha) {
        Optional<UserModel> usuarioOpt = userRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            UserModel usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(senha)) {
                return usuario;
            }
       }
       return null;
    }
}