import { useState } from 'react';
import api from '../../services/Api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      
      const token = response.data.token;
      
      localStorage.setItem('token', token);
      
      alert("Bem-vindo à ArenaMatch!");
      window.location.href = "/";
    } catch (error) {
      alert("E-mail ou senha incorretos.");
    }
  };
  const voltar = () => {
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
        <button type="button" onClick={voltar}>Voltar</button>
    </form>
  );
}

export default LoginForm;