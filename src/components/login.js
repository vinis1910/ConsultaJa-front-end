import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import ChooseSignupTypePopup from './selectsignup.js';

function Login() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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
        <div className="login">
            <main>
                <div className="login-card">
                    <h1 className="login-title">Acesse sua conta</h1>
                    <p className="login-description">
                        Gerencie suas consultas de forma rápida e segura
                    </p>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Usuário</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Digite seu usuário"
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <button type="button" className="forgot-password-btn" onClick={() => window.location.href = '/forgot-password'}>
                            Esqueci minha senha
                        </button>
                        <button type="submit" className="login-button">
                            Entrar
                        </button>
                        <button type="button" className="signup-button" onClick={handleSignupClick}>
                            Ainda não tenho conta
                        </button>
                    </form>
                </div>
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
                        <ChooseSignupTypePopup
                            open={true}
                            onClose={() => setShowPopup(false)}
                            onChoose={handleChoose}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
export default Login;