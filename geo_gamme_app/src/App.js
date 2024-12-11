import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPages';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Route racine qui redirige directement vers home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Route home accessible sans restriction */}
            <Route path="/home" element={<Home />} />

            {/* Route d'erreur */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;