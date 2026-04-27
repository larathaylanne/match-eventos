package com.example.demo.service;

import java.util.List;

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
    private UserRepository userRepository; // Para buscar o usuário pelo email/id

    @Transactional
    public void alternarInteresse(Long eventoId, String emailUsuario) {
        // 1. Busca o evento e o usuário no banco
        EventsModel evento = eventsRepository.findById(eventoId)
            .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
        
        UserModel usuario = userRepository.findByEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 2. Lógica de "Toggle" (Alternar)
        if (evento.getParticipantes().contains(usuario)) {
            // Se já está lá, remove o usuário e diminui 1
            evento.getParticipantes().remove(usuario);
            evento.setInteressados(evento.getInteressados() - 1);
        } else {
            // Se não está, adiciona o usuário e aumenta 1
            evento.getParticipantes().add(usuario);
            evento.setInteressados(evento.getInteressados() + 1);
        }

        // 3. Salva a alteração
        eventsRepository.save(evento);
    }
    
}