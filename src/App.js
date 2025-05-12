import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/homepage';
import LoginUser from './components/login';
import CreatePatient from './components/CreatePatient';
import CreateDoctor from './components/CreateDoctor';
import './styles/app.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src="images/logo.JPG" alt="Logo" className="logo-img" />
        </a>
      </div>
      <ul className="nav-links">
        <li><a href="/">Início</a></li>
        <li><a href="/services">Serviços</a></li>
        <li><a href="/about">Sobre Nós</a></li>
        <li><a href="/about">Área do Médico</a></li>
      </ul>
      <div>
        <img src="images/logo.JPG" alt="Logo" className="logo-img2" />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 ConsultaJá. Todos os direitos reservados.</p>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signup" element={<CreatePatient />} />
          <Route path="/doctor-signup" element={<CreateDoctor />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;