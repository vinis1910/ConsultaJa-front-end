import styles from "../styles/Home.module.css";
import DoctorSearch from "./DoctorSearch";

function Home() {
  return (
    <div className={styles.mainpage}>
      <main>
        <section  className={styles.banner}>
          <h1 className={styles.banner_title}>
            Bem-vindo ao <span className={styles.highlight}>ConsultaJá</span>
          </h1>
          <p className={styles.text1}>Conectando você aos melhores profissionais de saúde.</p>
          
        </section>
          <DoctorSearch/>
        <section>
          
        </section>

        <section>        
          <DoctorSearch/>
        </section>
        
        <section>
          
        </section>

        <section className={styles.services}>
          <h2>Nossos Serviços</h2>
          <div className={styles.service_cards}>
            <div className={styles.card}>
              <h3>Agendamento de Consultas</h3>
              <p>Marque consultas com médicos especializados de forma rápida e fácil.</p>
            </div>
            <div className={styles.card}>
              <h3>Chat com Médicos</h3>
              <p>Converse diretamente com profissionais de saúde para tirar dúvidas.</p>
            </div>
            <div className={styles.card}>
              <h3>Histórico Médico</h3>
              <p>Acesse seu histórico de consultas e exames em um só lugar.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
