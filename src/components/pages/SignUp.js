import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../../styles/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const history = useHistory();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (email && password && confirm) {
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return message.error("Passwords do not match.");
    }

    if (!email || !password || !confirm) {
      return message.error("All fields must be completed.");
    }

    try {
      await signUpWithEmail(email, password);
      history.push("/");
    } catch (e) {
      console.log(e);
      message.error(e.message);
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
    <section className="signup-form">
      <h2>Sign Up</h2>
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
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        onKeyDown={handleKeyDown}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        required
      />
      <Input.Password
        className="auth-input"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        required
      />
      <Button
        size="large"
        type="primary"
        className="submit"
        onClick={handleSubmit}
      >
        Create Account
      </Button>
      <Button
        size="large"
        type="primary"
        className="google-btn"
        onClick={() => handleGoogleSignIn()}
      >
        Sign Up with Google
      </Button>
    </section>
  );
};

export default SignUp;
