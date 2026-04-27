import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function Header() {

    const [usuarioNome, setUsuarioNome] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        try {
            const decoded = jwtDecode(token);
            // "nome" é o nome que você colocou no .claim("nome", ...) lá no Java
            setUsuarioNome(decoded.nome); 
        } catch (error) {
            console.error("Token inválido");
            localStorage.removeItem('token');
        }
        }
    }, []);
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsuarioNome(null);
        window.location.href = '/login';
    };

    return (
        <header>
            <h1>Arena Match</h1>
            <nav className="nav-buttons">
        {usuarioNome ? (
          // O que aparece quando está LOGADO
          <div className="user-info">
            <span>Olá, <strong>{usuarioNome}</strong></span>
            <button onClick={handleLogout} className="btn-logout">Sair</button>
          </div>
        ) : (
          // O que aparece quando NÃO está logado
          <div>
           <a href="/login"><button>Login</button></a>
           <a href="/signup"><button>Cadastrar</button></a>
          </div>
        )}
      </nav>
        </header>
    )
}

export default Header;