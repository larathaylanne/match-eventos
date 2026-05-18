import './App.css';
import EventsCarrossel from './components/EventCarrossel/EventsCarrossel';
import EventsCardMain from './components/Eventos/EventsCardMain';
import Header from './components/Header/Header'; 
import { Sparkles, Star, CircleCheckBig, TrendingUp } from 'lucide-react';  

function App() {
    const IsLogged = !!localStorage.getItem("token");

    const cadastro = () => {
        window.location.href = "/signup";
    };

    return (
        <div className="geral">
            <Header />



            {!IsLogged && (
                <div className="main">
                    <h1 className="main-title">Eventos em Destaque</h1>
                    <p className="subtitle">Descubra os melhores shows, jogos e festivais da Arena Pernambuco. Sua experiência começa aqui!</p>
                    <button onClick={cadastro}><Sparkles/> Comece agora - é gratuito!!</button>

                    <div className="divs">
                        <div className="exclusive">
                            <div className="icons">
                                <Star className="icon"/>
                            </div>
                            <h3>Eventos Exclusivos</h3>
                            <p>Acesso aos melhores eventos de Pernambuco</p>
                        </div>

                        <div className="recomendations">
                            <div className="icons">
                                <Sparkles className="icon"/> 
                            </div>
                                
                            <h3>Recomendações Personalizadas</h3>
                            <p>Sugestões baseadas nos seus interesses</p>
                        </div>

                        <div className="tendencias">
                            <div className="icons">
                                <TrendingUp className="icon" />
                            </div>
                            <h3>Acompanhe Tendências</h3>
                            <p>Veja os eventos mais populares em tempo real</p>
                        </div>

                        <div className="confirmation">
                            <div className="icons">
                                <CircleCheckBig className="icon" />
                            </div>
                            <h3>Confirmação Fácil</h3>
                            <p>Confirme sua presença nos eventos que deseja</p>
                        </div>
                    </div>
                 </div>)}

            {IsLogged && <EventsCarrossel/>}
            <EventsCardMain />
        </div>
    )
}

export default App;