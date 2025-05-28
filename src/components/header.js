import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/header.css";
import ChooseSignupTypeModal from './selectsignup.js';

function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleChoose = (type) => {
    setShowPopup(false);
    if (type === 'paciente') {
      navigate('/signup');
    } else if (type === 'medico') {
      navigate('/doctor-signup');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="images/logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Entrar</Link>
        <button
          className="signup-link"
          tabIndex={0}
          onClick={handleSignupClick}
          style={{ background: "none", border: "none", padding: 0, margin: 0 }}
        >
          Criar conta
        </button>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/agendar">Serviços</Link>
        </li>
        <li>
          <Link to="/about">Sobre Nós</Link>
        </li>
      </ul>
      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <ChooseSignupTypeModal
            open={true}
            onClose={() => setShowPopup(false)}
            onChoose={handleChoose}
          />
        </div>
      )}
    </header>
  );
}

export default Header;