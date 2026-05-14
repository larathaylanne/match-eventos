import { useState } from 'react';
import api from '../../../services/Api';
import './LoginForm.css';
import { ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }
    
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
    <div className="login">
      <button className="VoltarL" type="button" onClick={voltar}><ArrowLeft /> Voltar para Home</button>
      <form className="formlogin" onSubmit={handleLogin}>
        <div className="title">
          <div className="sparkles">
            <Sparkles className="sparkle"/>  
          </div>

          <h2>Bem-vindo de volta!</h2>
          <p>Entre para ver os próximos eventos e confirmar sua presença</p>
        </div>
         

          
            <div className="Dados">
              <label htmlFor="email">E-mail</label>
              <div className="input-container">
                <Mail />
                <input id="email" type="email" placeholder="E-mail" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="Dados">
              <label htmlFor="senha">Senha</label>
              <div className="input-container">
                <Lock />
                <input id="senha" type="password" placeholder="Senha" onChange={e => setFormData({...formData, senha: e.target.value})} />
              </div>
            </div>

          <button className="buttonSubmit" type="submit">Entrar na minha conta</button>

          <p className="AccountLogin">Não tem uma conta? <a href="/signup">Criar conta grátis</a></p>
      </form>
    </div>
  );
}

export default LoginForm;