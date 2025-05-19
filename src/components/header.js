import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src="images/logo.png" alt="Logo" className="logo-img" />
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Início</a>
        </li>
        <li>
          <a href="/services">Serviços</a>
        </li>
        <li>
          <a href="/about">Sobre Nós</a>
        </li>
        <li>
          <a href="/about">Área do Médico</a>
        </li>
      </ul>
      <div>
        <img src="images/logo.png" alt="Logo" className="logo-img2" />
      </div>
    </header>
  );
}

export default Header;