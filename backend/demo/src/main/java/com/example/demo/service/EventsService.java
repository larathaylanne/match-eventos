package com.example.demo.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.EventsModel;
import com.example.demo.models.UserModel;
import com.example.demo.repository.EventsRepository;
import com.example.demo.repository.UserRepository;

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

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void alternarInteresse(Long eventoId, String emailUsuario) {
        EventsModel evento = eventsRepository.findById(eventoId)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        
        UserModel usuario = userRepository.findByEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (evento.getParticipantes().contains(usuario)) {
            evento.getParticipantes().remove(usuario);
        } else {
            evento.getParticipantes().add(usuario);
        }
        
        evento.setInteressados(evento.getParticipantes().size());
        eventsRepository.save(evento);
    }
    
   public List<EventsModel> listarPorInteressesDoUsuario(String email) {
        UserModel usuario = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Set<String> interesses = usuario.getInteressesCategorias();

        if (interesses == null || interesses.isEmpty()) {
            return List.of(); // Retorna vazio se não tiver interesses cadastrados
        }

        return eventsRepository.findByCategoriaIn(interesses);
    }



    // No EventsService.java

    public List<EventsModel> listarPorCategoria(String categoria) {
        // Se o usuário não mandar categoria (ou mandar vazio), retorna tudo
        if (categoria == null || categoria.isEmpty()) {
            return eventsRepository.findAll();
        }
        
        // Caso contrário, busca pela categoria específica
        return eventsRepository.findByCategoria(categoria);
    }

    
}