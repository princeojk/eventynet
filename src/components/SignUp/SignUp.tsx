import { useState } from "react";
import Input from "../Input/Input";
import css from "./signup.module.scss";
import Button from "../Buttons/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../auth/authContextHook";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      createUser(userCredential.user.uid);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email is already registered");
            break;
          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;
          case "auth/invalid-email":
            setError("invalid Email");
            break;
          default:
            setError("Signup Failed, Please try again");
        }
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (uid: string) => {
    if (!uid) {
      console.log("tk uid", uid);
      return;
    }

    const url = import.meta.env.VITE_PUBLIC_BASE_URL + "auth/signup";

    const body = {
      uid: uid,
      name: name,
      email: email,
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.json();
        console.log(msg);
      }
    } catch {
      throw new Error("An error occurred");
    }
  };

  return (
    <div className={css.container}>
      <p className={css.title}>Sign up</p>
      <div className={css.name}>
        <Input
          containerSize="small"
          id="name"
          color="black"
          layout="horizontal"
          inputSize={30}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        >
          Name
        </Input>
      </div>
      <div className={css.email}>
        <Input
          containerSize="small"
          id="email"
          color="black"
          layout="horizontal"
          inputSize={30}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        >
          Email
        </Input>
      </div>
      <div className={css.password}>
        <Input
          containerSize="small"
          id="password"
          color="black"
          layout="horizontal"
          inputSize={30}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
        >
          Password
        </Input>
      </div>
      <div className={css.confirmPassword}>
        <Input
          containerSize="small"
          id="confirmPassword"
          color="black"
          layout="horizontal"
          inputSize={30}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          type="password"
        >
          Confirm Passord
        </Input>
      </div>
      {error && <p className={css.error}>{error}</p>}
      <div className={css.signUpButton}>
        <Button size="small" onClick={handleSignUp} disabled={loading}>
          {loading ? "saving..." : "Sign Up"}
        </Button>
      </div>
      <p className={css.registered}>
        Already registered? <Link to="/login">Click here to Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
