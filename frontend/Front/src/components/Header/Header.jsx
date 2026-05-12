import './Header.css';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Catalogo from '../Catalogo/Catalogo';

function Header() {

    const [usuarioNome, setUsuarioNome] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        try {
            const decoded = jwtDecode(token);
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
                <a href="/">Home</a>
                <a href="/catalogo">Catálogo</a>
                <div>
                    {usuarioNome ? (
                        <div className="user-info">
                            <span>Olá, <strong>{usuarioNome}</strong></span>
                            <button onClick={handleLogout} className="btn-logout">Sair</button>
                        </div>
                        ) : (
                        <div>
                            <a href="/login"><button>Login</button></a>
                            <a href="/signup"><button>Cadastrar</button></a>
                        </div>
                    )}
                </div>
                
            </nav>    
        </header>
    )
}

export default Header;