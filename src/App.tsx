import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext'
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { AdminRoom } from "./pages/AdminRoom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
    <ThemeContextProvider>
    <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;

// COMPONENTES BASEADOS EM CLASSE LIMITAM A APLICAÇÃO
// AGORA SÃO FUNÇÕES

// Propriedades: nas tags HTML são os atributos
// nos componentes são as propriedades

