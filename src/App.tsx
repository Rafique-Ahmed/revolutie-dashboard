// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { RouteBuilder } from './routes/RouteBuilder';

function App() {
  return (
    <BrowserRouter>
      <RouteBuilder />
    </BrowserRouter>
  );
}

export default App;
