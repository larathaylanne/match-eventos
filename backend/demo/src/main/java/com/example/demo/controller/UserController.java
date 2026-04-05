package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.UserModel;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registrar")
    public ResponseEntity<UserModel> registrar(@RequestBody UserModel user) {
        UserModel novoUser = userService.cadastrarUsuario(user);
        return new ResponseEntity<>(novoUser, HttpStatus.CREATED);
    }
}