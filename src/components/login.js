import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import ChooseSignupTypeModal from './selectsignup.js';

function Login() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignupClick = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleChoose = (type) => {
        setModalOpen(false);
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
                <ChooseSignupTypeModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onChoose={handleChoose}
                />
            </main>
        </div>
    );
}
export default Login;