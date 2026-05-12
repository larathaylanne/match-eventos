import { useState } from 'react';
import api from '../../../services/Api';

function SignupForm() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      alert("Preencha todos os campos.");
      return;
    }
    
    try {
        await api.post('/usuarios/registrar', formData);
        const response = await api.post('/usuarios/login', { email: formData.email, senha: formData.senha });
        
        const token = response.data.token;
        
        localStorage.setItem('token', token);
        
        alert("Bem-vindo à ArenaMatch!");
        window.location.href = "/interesses";
    }catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Erro completo:", error);
      alert(error.response?.data?.message || "Erro ao cadastrar.");
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