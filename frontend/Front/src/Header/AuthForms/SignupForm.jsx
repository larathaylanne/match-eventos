import { useState } from 'react';
import api from '../../services/Api';

function SignupForm() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/registrar', formData);
      alert("Usuário cadastrado com sucesso! Agora faça login.");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data || "Erro ao cadastrar.");
    }
  };

  const voltar = () => {
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Conta - ArenaMatch</h2>
      <input type="text" placeholder="Nome" onChange={e => setFormData({...formData, nome: e.target.value})} />
      <input type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Senha" onChange={e => setFormData({...formData, senha: e.target.value})} />
      <button type="submit">Cadastrar</button>
      <button type="button" onClick={voltar}>Voltar</button>
    </form>
  );
}

export default SignupForm;