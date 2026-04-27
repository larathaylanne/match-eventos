package com.example.demo.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity; // Importa as anotações para o banco de dados
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity // Define que é uma tabela no banco
@Table(name = "eventos")
public class EventsModel {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;      
    private String descricao;  
    private String dataEvento;  
    private String local;       
    private int interessados;   
    private String imagemUrl;

    public EventsModel() {}

    @ManyToMany
    @JoinTable(
        name = "eventos_participantes",
        joinColumns = @JoinColumn(name = "evento_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private Set<UserModel> participantes = new HashSet<>();
    
    public Set<UserModel> getParticipantes() {
        return participantes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getDataEvento() { return dataEvento; }
    public void setDataEvento(String dataEvento) { this.dataEvento = dataEvento; }

    public String getLocal() { return local; }
    public void setLocal(String local) { this.local = local; }

    public int getInteressados() { return participantes.size(); }
    public void setInteressados(int interessados) { this.interessados = interessados; }

    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }

}