import api from "../../services/Api"
import { useState, useEffect } from "react";
import './EventsCardMain.css';
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

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
            <div key={event.id} className="eventcardmain" onClick={() => navigate(`/eventos/${event.id}`)} >
                <img src={event.imagemUrl} alt={event.titulo} />
                <div className="ptBaixo">
                    
                    <h3>{event.titulo}</h3>
                    <p>{event.categoria}</p>
                    <p><Calendar className="calendar"/>{event.dataEvento}</p>
                    <span><Users className="inteCont" />{event.interessados} interessados</span>
                    <p>{event.descricao}</p>
                </div>
                
            </div>
            ))}
      </div>
        </div>
    );
}

export default EventsCardMain;