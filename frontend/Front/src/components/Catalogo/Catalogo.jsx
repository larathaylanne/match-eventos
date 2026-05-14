import api from "../../services/Api"
import { useState, useEffect } from "react";
import './Catalogo.css';
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Catalogo(){
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
        <>
            <Header/>
            <div className="eventGeral">
            
                <h1>Catálogo de Eventos</h1>
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
                        ))
                    ) : (
                        <p>Nenhum evento encontrado para esta categoria.</p>
                    )}
                </div>
            </div>
        </>

    );
}

export default Catalogo;