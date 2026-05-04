import api from "../services/Api"
import { useState, useEffect } from "react";
import './EventsCardMain.css'; // Importe o CSS para estilizar os cards de eventos

function EventsCardMain(){

    const [events, setEvents] = useState([]); // 2. Estado para guardar a lista
    const [categoria, setCategoria] = useState(""); // Estado do filtro

    const carregarEventos = async (filtro = "") => {
        try {
            // Se houver categoria, usa a rota de filtrar, senão usa a rota geral
            const rota = filtro ? `/eventos/filtrar?categoria=${filtro}` : "/eventos";
            const response = await api.get(rota);
            setEvents(response.data);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
        }
    };

    // Carrega tudo ao abrir a página
    useEffect(() => {
        carregarEventos();
    }, []);

    // Função disparada quando o usuário muda o Select
    const handleFilterChange = (e) => {
        const valor = e.target.value;
        setCategoria(valor);
        carregarEventos(valor); // Chama a API com a nova categoria
    };

    return (
        <div className="eventGeral">

            <div className="filter-section">
                <label>Filtrar por Esporte: </label>
                <select value={categoria} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    <option value="Esportes">Esportes</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Basquete">Basquete</option>
                    <option value="Vôlei">Vôlei</option>
                </select>
            </div>

            <div className="eventsGrid">
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event.id} className="eventcard">
                            <img src={event.imagemUrl} alt={event.titulo} />
                            <h3>{event.titulo}</h3>
                            <p>{event.categoria}</p>
                            <span>Interessados: {event.interessados}</span>
                        </div>
                    ))
                ) : (
                    <p>Nenhum evento encontrado para esta categoria.</p>
                )}
            </div>
        </div>
    );
}

export default EventsCardMain;