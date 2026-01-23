import { useState } from "react";
import Input from "../Input/Input";
import css from "./login.module.scss";
import Button from "../Buttons/Button";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("Invalid email or password");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.loginContainer}>
      <p className={css.title}>Welcome to EventyNet</p>
      <div className={css.inputs}>
        <Input
          id="loginEmail"
          containerSize="small"
          inputSize={8}
          color="black"
          layout="vertical"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        >
          Email
        </Input>
        <Input
          id="loginPassword"
          containerSize="small"
          inputSize={8}
          color="black"
          layout="vertical"
          placeholder="Enter your Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        >
          Password
        </Input>
        {error && <p className={css.error}>{error}</p>}
        <div className={css.loginButton}>
          <Button size="small" onClick={handleLogin} disabled={loading}>
            {loading ? "loading..." : "LOGIN NOW"}
          </Button>
        </div>
        <div className={css.loginButton}>
          <Button size="small" onClick={handleLoginWithGoogle} color="red">
            Sign In With Google
          </Button>
        </div>
      </div>
      <p className={css.registered}>
        Do not have an account ? <Link to="/signup">Click here to Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginComponent;
