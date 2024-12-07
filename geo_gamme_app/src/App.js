import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPages';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        {isAuthenticated && <Navbar />}

        <main className="flex-grow">
          <Routes>
            {/* Route racine qui redirige vers login ou home selon l'authentification */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Route login */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            {/* Route home protégée */}
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Route d'erreur */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;