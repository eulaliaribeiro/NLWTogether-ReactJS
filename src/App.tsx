import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext'
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

// COMPONENTES BASEADOS EM CLASSE LIMITAM A APLICAÇÃO
// AGORA SÃO FUNÇÕES

// Propriedades: nas tags HTML são os atributos
// nos componentes são as propriedades

