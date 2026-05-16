import './EventsCarrossel.css';
import api from "../../services/Api"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

function EventsCarrossel() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const isLogged = !!localStorage.getItem("token");

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
                        <div key={event.id} className="eventcard" onClick={() => isLogged ? navigate(`/eventos/${event.id}`) : navigate("/login")} >
                            <img src={event.imagemUrl} alt={event.titulo} />
                            <div className="ptBaixo">
                                
                                <h3>{event.titulo}</h3>
                                <p>{event.categoria}</p>
                                <p><Calendar className="calendar"/>{event.dataEvento}</p>
                                <span><Users className="inteCont" />{event.interessados} interessados</span>
                                <p>{event.descricao}</p>
                            </div>
                        
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