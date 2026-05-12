import './App.css';
import EventsCarrossel from './components/EventCarrossel/EventsCarrossel';
import EventsCardMain from './components/Eventos/EventsCardMain';
import Header from './components/Header/Header';   

function App() {
    return (
        <div>
            <Header />
            <EventsCarrossel/>
            <EventsCardMain />
        </div>
    )
}

export default App;