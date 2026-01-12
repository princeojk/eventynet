import Hero from "../components/Hero/Hero";
import Login from "./Login";
import SignUp from "./SignUp";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import { AuthProvider } from "../auth/AuthContext";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../ProtectedRoute";

const Home = () => {
  return (
    <>
      <AuthProvider>
        <Header />

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
      </AuthProvider>
    </>
  );
};

export default Home;
