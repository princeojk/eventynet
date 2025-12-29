import Hero from "../components/Hero/Hero";
import Login from "./Login";
import Profile from "./Profile";
import SignUp from "./SignUp";
import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import { navBarContext } from "../context";

const Home = () => {
  const user = "";
  return (
    <>
      <navBarContext.Provider value={user}>
        <Header />
      </navBarContext.Provider>

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Home;
