import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/Header/AuthForms/LoginForm.jsx';
import SignupForm from './components/Header/AuthForms/SignupForm.jsx';
import InteressePage from './components/Interesse/InteressePage.jsx';
import Catalogo from './components/Catalogo/Catalogo.jsx';
import EventoDetalhe from './components/Eventos/EventoDetalhe.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/signup",
    element: <SignupForm/>
  },
  {
    path: "/interesses",
    element: <InteressePage/>
  },
  {
    path: "/catalogo",
    element: <Catalogo />
  },
  { 
    path: "/eventos/:id",
    element: <EventoDetalhe /> 
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
