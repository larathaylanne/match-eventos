import './EventsCarrossel.css';
import api from "../../services/Api"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

function EventsCarrossel() {
  const [current, setCurrent] = useState(0);
  const visible = 4;
  const cardW = 382;
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("token");

  const maxCurrent = Math.max(0, events.length - visible);

  const carregarEventos = async () => {
    try {
      const response = await api.get("/eventos/recomendados");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos recomendados:", error);
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <div className="events-carrossel">
      <h2>Eventos Recomendados</h2>
      <div className="carrossel-content">
        <div
          className="carrossel-track"
          style={{ transform: `translateX(-${current * cardW}px)` }}
        >
          {events.length > 0 ? (
            events.map(event => (
              <div
                key={event.id}
                className="eventcard"
                onClick={() => isLogged ? navigate(`/eventos/${event.id}`) : navigate("/login")}
              >
                <img src={event.imagemUrl} alt={event.titulo} />
                <div className="ptBaixo">
                  <h3>{event.titulo}</h3>
                  <p>{event.categoria}</p>
                  <p><Calendar className="calendar" />{event.dataEvento}</p>
                  <span><Users className="inteCont" />{event.interessados} interessados</span>
                  <p>{event.descricao}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum evento encontrado.</p>
          )}
        </div>
      </div>
      <div className="nav-carrossel">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))}>‹</button>
        <button onClick={() => setCurrent(c => Math.min(maxCurrent, c + 1))}>›</button>
      </div>
    </div>
  );
}

export default EventsCarrossel;