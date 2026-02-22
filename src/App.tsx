import "./App.css";
import Hero from "./components/Hero/Hero";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { AuthProvider } from "./auth/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { AlertProvider } from "./components/Alerts/AlertContext";
import Alert from "./components/Alerts/Alert";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Header />
        <Alert />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
