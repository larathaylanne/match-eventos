package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.EventsModel;
import com.example.demo.service.EventsService;

@RestController 
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventsController {

    @Autowired 
    private EventsService eventsService;

    @GetMapping
    public ResponseEntity<List<EventsModel>> listarTodos() {
        List<EventsModel> eventos = eventsService.listarTodos();
        
        return ResponseEntity.ok(eventos);
    }

    
}