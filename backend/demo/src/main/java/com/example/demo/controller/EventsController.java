package com.example.demo.controller;

// Importamos as ferramentas necessárias para a web e para o nosso projeto
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.EventsModel;
import com.example.demo.service.EventsService;

@RestController // Define que esta classe responde requisições HTTP (API)
@RequestMapping("/api/eventos") // Define o caminho base: http://localhost:8080/api/eventos
@CrossOrigin(origins = "*") // LIBERA O ACESSO para o seu React/Vite não dar erro de CORS
public class EventsController {

    @Autowired // Injeta o Service que criamos anteriormente
    private EventsService eventsService;

    @GetMapping
    public ResponseEntity<List<EventsModel>> listarTodos() {
        // O Service busca no banco e o Controller entrega para a internet
        List<EventsModel> eventos = eventsService.listarTodos();
        
        // Retorna a lista com status 200 (OK)
        return ResponseEntity.ok(eventos);
    }

    
}