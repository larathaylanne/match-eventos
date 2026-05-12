import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/Api";
import './EventoDetalhe.css';

function EventoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interessado, setInteressado] = useState(false);

  useEffect(() => {
    const buscarEvento = async () => {
      try {
        const response = await api.get(`/eventos/${id}`);
        setEvento(response.data);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarEvento();
  }, [id]);

  const handleInteresse = async () => {
    try {
      await api.post(`/eventos/${id}/interesse`);
      setInteressado(prev => !prev);
      setEvento(prev => ({
        ...prev,
        interessados: interessado ? prev.interessados - 1 : prev.interessados + 1
      }));
    } catch (error) {
      console.error("Erro ao registrar interesse:", error);
    }
  };

  if (loading) return <p className="detalhe-loading">Carregando evento...</p>;
  if (!evento) return <p className="detalhe-erro">Evento não encontrado.</p>;

  return (
    <div className="detalhe-container">
      <button className="btn-voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="detalhe-card">
        {evento.imagemUrl && (
          <img className="detalhe-img" src={evento.imagemUrl} alt={evento.titulo} />
        )}

        <div className="detalhe-body">
          <span className="detalhe-badge">{evento.categoria}</span>
          <h1 className="detalhe-titulo">{evento.titulo}</h1>

          <div className="detalhe-infos">
            <p>📅 {evento.dataEvento}</p>
            <p>📍 {evento.local}</p>
            <p>♥ {evento.interessados} interessados</p>
          </div>

          <p className="detalhe-descricao">{evento.descricao}</p>

          <button
            className={`btn-interesse ${interessado ? "ativo" : ""}`}
            onClick={handleInteresse}
          >
            {interessado ? "✓ Tenho interesse" : "Tenho interesse"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventoDetalhe;