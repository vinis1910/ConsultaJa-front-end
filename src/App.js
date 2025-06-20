import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePatient from "./components/CreatePatient";
import CreateDoctor from "./components/CreateDoctor";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./utils/AuthContext";
import AccountSettings from "./components/AccountSettings";
import ScheduleSettings from "./components/ScheduleSettings";
import {RequireAuth} from "./utils/RequireAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<LoginForm />} />
          <Route path="/criar-conta/paciente" element={<CreatePatient />} />
          <Route path="/criar-conta/medico" element={<CreateDoctor/>} />
          <Route path="/conta" element={<RequireAuth><AccountSettings/></RequireAuth>} />
          <Route path="/atendimento" element={<RequireAuth><ScheduleSettings/></RequireAuth>}/>
          <Route path="/pesquisa" element={<SearchResults/>}/>
        </Routes>
      <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
