import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../../styles/login.css";

const Login = () => {
  const { currentUser, loginWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (email && password) {
        handleLogIn(e);
      }
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return message.error("All fields must be completed.");
    }

    try {
      await loginWithEmail(email, password);
      history.push("/");
    } catch (e) {
      message.error(e.message);
      console.log(e);
    }
  };

  const handleGoogleSignIn = () => {
    try {
      signInWithGoogle();
      history.push("/");
    } catch (e) {
      message.error(e.message);
      console.log(e);
    }
  };

  return (
    <section className="login">
      <h2>Login to IdeaPad</h2>

      <Input
        className="auth-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input.Password
        className="auth-input"
        type="password"
        value={password}
        onKeyDown={handleKeyDown}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        required
      />
      <Button
        size="large"
        type="primary"
        className="submit"
        onClick={handleLogIn}
      >
        Log In
      </Button>
      <Button
        size="large"
        type="primary"
        className="google-btn"
        onClick={() => handleGoogleSignIn()}
      >
        Sign In with Google
      </Button>
    </section>
  );
};

export default Login;
