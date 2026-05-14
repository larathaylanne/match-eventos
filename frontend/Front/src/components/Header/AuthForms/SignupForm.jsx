import { useState } from 'react';
import api from '../../../services/Api';
import './SignupForm.css';
import { ArrowLeft, User, Mail, Lock, Sparkles, CircleCheckBig } from 'lucide-react';

function SignupForm() {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '',confirmarSenha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
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
    <div className="signup">
      <button className="Voltar" type="button" onClick={voltar}><ArrowLeft /> Voltar para Home</button>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <div className="sparkles">
              <Sparkles className="sparkle"/>  
            </div>
               
            <h2>Crie sua Conta</h2>
            <p>Junte-se a milhares de pessoas que já aproveitam os melhores eventos</p>
          </div>

          <div className="centro">
            <h3>O que você ganha:</h3>
            <div className="beneficio">
              <CircleCheckBig className="circleCheck"/>
              <p>Recomendações personalizadas de eventos</p>
            </div>

            <div className="beneficio">
              <CircleCheckBig className="circleCheck"/>
              <p>Confirmação de presença facilitada</p>
            </div>

            <div className="beneficio">
              <CircleCheckBig className="circleCheck"/>
              <p>Acompanhe eventos em tempo real</p>
            </div>
          </div>

          <div className="Dados">
            <label htmlFor="nome">Nome</label>
            <div className="input-container">
              <User />
              <input id="nome" type="text" placeholder="Nome" onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            
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

          <div className="Dados">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <div className="input-container">
              <Lock />
              <input id="confirmarSenha" type="password" placeholder="Confirme sua senha"
                onChange={e => setFormData({...formData, confirmarSenha: e.target.value})} />
            </div>
          </div>

          <button className="buttonSubmit" type="submit">Cadastrar</button>

          <p className="AccountLogin">Já tem uma conta? <a href="/login">Fazer login</a></p>
          
        </form>
      </div>
    );
  }

export default SignupForm;