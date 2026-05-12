import './EventsCarrossel.css';
import api from "../../services/Api"
import { useState, useEffect } from "react";

function EventsCarrossel() {
    const [events, setEvents] = useState([]);

    const carregarEventos = async () => {
        try {
            const response = await api.get("/eventos/recomendados");
            setEvents(response.data);
        } catch (error) {
            console.error("Erro ao carregar eventos recomendados:", error);
        }
    }

    useEffect(() => {
        carregarEventos();
    }, []);

    return (
        <div className="events-carrossel">
            <h2>Eventos Recomendados</h2>
            <div className="carrossel-content">
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
    )
}

export default EventsCarrossel;