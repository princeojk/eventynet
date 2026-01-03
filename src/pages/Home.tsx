import Hero from "../components/Hero/Hero";
import Login from "./Login";
import Profile from "./Profile";
import SignUp from "./SignUp";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import { navBarContext } from "../context";
import { AuthProvider } from "../auth/AuthContext";

const Home = () => {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Home;
