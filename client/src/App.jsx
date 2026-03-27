import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./landing/landingpage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DonorDashboard from "./pages/donor/Dashboard";
import NgoDashboard from "./pages/ngo/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/ngo/dashboard" element={<NgoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;