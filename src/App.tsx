// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { AnimatedLayout } from './components/layout/AnimatedLayout';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <AnimatedLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatedLayout>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
