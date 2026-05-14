import api from "../../services/Api"
import { useState, useEffect } from "react";
import './EventsCardMain.css';
import { useNavigate } from "react-router-dom";

function EventsCardMain(){
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [categoria, setCategoria] = useState("");

    const carregarEventos = async (filtro = "") => {
        try {
            const rota = filtro ? `/eventos/filtrar?categoria=${filtro}` : "/eventos";
            const response = await api.get(rota);
            setEvents(response.data);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
        }
    };

    useEffect(() => {
        carregarEventos();
    }, []);

    const handleFilterChange = (e) => {
        const valor = e.target.value;
        setCategoria(valor);
        carregarEventos(valor);
    };

    return (
        <div className="eventGeral">
            <h2>Eventos Gerais</h2>
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
            {events.slice(0, 12).map(event => (
            <div
                key={event.id}
                className="eventcard"
                onClick={() => navigate(`/eventos/${event.id}`)} // adiciona isso
                style={{ cursor: "pointer" }}
            >
                <img src={event.imagemUrl} alt={event.titulo} />
                <h3>{event.titulo}</h3>
                <p>{event.categoria}</p>
                <span>Interessados: {event.interessados}</span>
            </div>
            ))}
      </div>
        </div>
    );
}

export default EventsCardMain;