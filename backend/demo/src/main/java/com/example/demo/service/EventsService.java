package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.EventsModel;
import com.example.demo.repository.EventsRepository;

@Service
public class EventsService {

    @Autowired
    private EventsRepository eventsRepository;

    public List<EventsModel> listarTodos() {
        return eventsRepository.findAll();
    }

    public EventsModel salvarEvento(EventsModel evento) {
        if (evento.getInteressados() < 0) {
            evento.setInteressados(0);
        }
        return eventsRepository.save(evento);
    }

    public EventsModel buscarPorId(Long id){
        return eventsRepository.findById(id).orElse(null);
    }
    
}