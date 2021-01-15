import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { currentUser, signUpWithEmail } = useAuth();
  const { alert, createAlert } = useAlerts();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmRef.current.value) {
      return createAlert("Error", "Passwords do not match.");
    }

    try {
      await signUpWithEmail(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      console.log(e);
      createAlert("Error", e.message);
    }
  };

  return (
    <section className="signup-form">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form className="signup">
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
        <input
          className="auth-input"
          type="password"
          ref={confirmRef}
          placeholder="Confirm password"
          required
        />
        <button className="submit" onClick={handleSubmit}>
          Create Account
        </button>
      </form>
    </section>
  );
};

export default SignUp;
