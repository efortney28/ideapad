import { useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";

const Login = () => {
  const { currentUser, loginWithEmail } = useAuth();
  const { alert, createAlert } = useAlerts();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      createAlert("Error", e.message);
      console.log(e);
    }
  };

  return (
    <section className="login">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form className="login-form">
        <input
          className="auth-input"
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
        />
        <input
          className="auth-input"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <button className="submit" onClick={handleLogIn}>
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
