package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.EventsModel;
import com.example.demo.service.EventsService;

@RestController 
@RequestMapping("/eventos")
@CrossOrigin(origins = "*")
public class EventsController {

    @Autowired 
    private EventsService eventsService;

    @GetMapping
    public ResponseEntity<List<EventsModel>> listarTodos() {
        List<EventsModel> eventos = eventsService.listarTodos();
        
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventsModel> buscarPorId(@PathVariable Long id) {
        EventsModel evento = eventsService.buscarPorId(id);
        if (evento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(evento);
    }
    

    @PostMapping("/{id}/interesse")
    public ResponseEntity<?> Interesse(@PathVariable Long id, Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você precisa estar logado!");
        }

        String emailUsuario = authentication.getName();
        eventsService.alternarInteresse(id, emailUsuario);
        
        return ResponseEntity.ok("Operação realizada com sucesso!");
    }

    @GetMapping("/recomendados")
    public ResponseEntity<List<EventsModel>> recomendados(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<EventsModel> eventos = eventsService.listarPorInteressesDoUsuario(authentication.getName());
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<EventsModel>> filtrar(@RequestParam String categoria) {
        List<EventsModel> listaFiltrada = eventsService.listarPorCategoria(categoria);
        return ResponseEntity.ok(listaFiltrada);
    }
    
}