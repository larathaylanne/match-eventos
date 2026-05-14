import './App.css';
import EventsCarrossel from './components/EventCarrossel/EventsCarrossel';
import EventsCardMain from './components/Eventos/EventsCardMain';
import Header from './components/Header/Header';   

function App() {
    const IsLogged = !!localStorage.getItem("token");

    return (
        <div className="geral">
            <Header />

            <div className="main">
                <h1 className="main-title">Eventos em Destaque</h1>
                <p className="subtitle">Descubra os melhores shows, jogos e festivais da Arena Pernambuco. Sua experiência começa aqui!</p>
                <a href="/signup"><button>Comece agora - é gratuito!!</button></a>

                <div className="divs">
                    <div className="exclusive">
                        <h3>Eventos Exclusivos</h3>
                        <p>Acesso aos melhores eventos de Pernambuco</p>
                    </div>

                    <div className="recomendations">
                        <h3>Recomendações Personalizadas</h3>
                        <p>Sugestões baseadas nos seus interesses</p>
                    </div>

                    <div className="tendencias">
                        <h3>Acompanhe Tendências</h3>
                        <p>Veja os eventos mais populares em tempo real</p>
                    </div>

                    <div className="confirmation">
                        <h3>Confirmação Fácil</h3>
                        <p>Confirme sua presença nos eventos que deseja</p>
                    </div>
                </div>

                
            </div>

            {IsLogged && <EventsCarrossel/>}
            <EventsCardMain />
        </div>
    )
}

export default App;