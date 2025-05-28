import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";

function Mainpage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="Mainpage">
      <main>
        <section id="home" className="banner">
          <h1 className="banner-title">
            Bem-vindo ao <span className="highlight">ConsultaJá</span>
          </h1>
          <p className="text1">Conectando você aos melhores profissionais de saúde.</p>
          <button className="cta-btn" onClick={handleButtonClick}>
            Agendar Consulta
          </button>
        </section>

        <section id="services" className="services">
          <h2>Nossos Serviços</h2>
          <div className="service-cards">
            <div className="card">
              <h3>Agendamento de Consultas</h3>
              <p>Marque consultas com médicos especializados de forma rápida e fácil.</p>
            </div>
            <div className="card">
              <h3>Chat com Médicos</h3>
              <p>Converse diretamente com profissionais de saúde para tirar dúvidas.</p>
            </div>
            <div className="card">
              <h3>Histórico Médico</h3>
              <p>Acesse seu histórico de consultas e exames em um só lugar.</p>
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews">
          <h2>Avaliações de Usuários</h2>
          <div className="carousel">
            <div className="review-card">
              <p>"O ConsultaJá facilitou muito minha vida! Agora consigo agendar consultas rapidamente e sem complicações."</p>
              <h4>- Maria Silva</h4>
            </div>
            <div className="review-card">
              <p>"A plataforma é incrível! O chat com médicos me ajudou a esclarecer dúvidas importantes."</p>
              <h4>- João Oliveira</h4>
            </div>
            <div className="review-card">
              <p>"Ter acesso ao meu histórico médico em um só lugar é uma grande vantagem. Recomendo o ConsultaJá!"</p>
              <h4>- Ana Costa</h4>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Mainpage;
