import { useState, useEffect } from "react";
import api from "../../services/Api";
import './InteressePage.css';
import {Star} from "lucide-react"

const INTERESSES = [
  { id: "Esportes",     emoji: "⚽", nome: "Esportes" },
  { id: "Tecnologia",       emoji: "💻", nome: "Tecnologia" },
  { id: "Eventos Culturais", emoji: "🎭", nome: "Eventos Culturais" },
  { id: "Eventos Sociais",        emoji: "🎉", nome: "Eventos Sociais" },
  { id: "corridas",    emoji: "🏃", nome: "Corridas" },
];

function InteressePage() {
  const [selecionados, setSelecionados] = useState([]);
  const [original, setOriginal] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarInteresses = async () => {
      try {
        const response = await api.get("/usuarios/interesses");
        const lista = response.data;
        setSelecionados(lista);
        setOriginal(lista);
      } catch (error) {
        console.error("Erro ao carregar interesses:", error);
      }
    };
    carregarInteresses();
  }, []);

  const toggleInteresse = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAtualizar = async () => {
    if (selecionados.length === 0) {
      alert("Selecione pelo menos 1 interesse!");
      return;
    }

    setLoading(true);
    try {
      const adicionados = selecionados.filter((id) => !original.includes(id));
      const removidos = original.filter((id) => !selecionados.includes(id));

      await Promise.all(
        adicionados.map((id) => api.post(`/usuarios/interesses/${id}`))
      );

      await Promise.all(
        removidos.map((id) => api.delete(`/usuarios/interesses/${id}`))
      );

      setOriginal(selecionados);
      alert("Interesses atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar interesses:", error);
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
    window.location.href = "/";
  };

  return (
    <div className="interesse-page">

      <div className="interesse-header">
        <div className="interesse-star-icon"><Star /></div>
        <h1 className="interesse-title">Editar Seus Interesses</h1>
        <p className="interesse-sub">
          Atualize os tipos de eventos que você gosta para melhorar suas recomendações
        </p>
      </div>

      <div className="interesse-bar">
        <span className="interesse-label">Selecione pelo menos 1 interesse</span>
        <span className="interesse-badge">
          {selecionados.length} selecionado{selecionados.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="interesse-grid">
        {INTERESSES.map((item) => {
          const ativo = selecionados.includes(item.id);
          return (
            <div
              key={item.id}
              className={`interesse-card ${ativo ? "selecionado" : ""}`}
              onClick={() => toggleInteresse(item.id)}
            >
              {ativo && <span className="interesse-check">✓</span>}
              <span className="interesse-emoji">{item.emoji}</span>
              <span className="interesse-nome">{item.nome}</span>
            </div>
          );
        })}
      </div>

      <button
        className="interesse-btn"
        onClick={handleAtualizar}
        disabled={loading}
      >
        {loading ? "Salvando..." : "Atualizar meus interesses"}
      </button>

    </div>
  );
}

export default InteressePage;