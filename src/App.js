import './App.css';
import Menu from './componentes/Menu';
import FormCategoria from './paginas/FormCategoria';
import Home from './paginas/Home';
import ListaCategoria from './paginas/ListaCategoria.js';

function App() {
  return (
    <div>
      <Menu />
      <Home />
      <ListaCategoria />
      <FormCategoria />
    </div>
  );
}

export default App;