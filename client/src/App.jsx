import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./landing/landingpage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DonorDashboard from "./pages/donor/Dashboard";
import NgoDashboard from "./pages/ngo/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import { ProtectedRoute, AuthRoute } from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        
        <Route path="/donor/dashboard" element={
            <ProtectedRoute allowedRoles={["DONOR"]}><DonorDashboard /></ProtectedRoute>
        } />
        <Route path="/ngo/dashboard" element={
            <ProtectedRoute allowedRoles={["NGO"]}><NgoDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;