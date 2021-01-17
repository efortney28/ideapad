import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "../../styles/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const { currentUser, signUpWithEmail } = useAuth();
  const { alert, createAlert } = useAlerts();
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
      return createAlert("Error", "Passwords do not match.");
    }

    try {
      await signUpWithEmail(email, password);
      history.push("/");
    } catch (e) {
      console.log(e);
      createAlert("Error", e.message);
    }
  };

  return (
    <section className="signup-form">
      <h2>Sign Up</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
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
    </section>
  );
};

export default SignUp;
