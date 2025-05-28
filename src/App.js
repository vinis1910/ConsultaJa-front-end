import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/homepage";
import LoginUser from "./components/login";
import CreatePatient from "./components/CreatePatient";
import CreateDoctor from "./components/CreateDoctor";
import Header from "./components/header";
import Footer from "./components/footer";
import AgendarConsulta from "./components/agendar";

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
          <Route path="/agendar" element={<AgendarConsulta />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;