import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loginWithEmail } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="login">
      <form className="login-form">
        <input
          className="auth-input"
          type="email"
          ref={emailRef}
          placeholder="Email"
        />
        <input
          className="auth-input"
          type="password"
          ref={passwordRef}
          placeholder="Password"
        />
        <button className="submit" onClick={handleLogIn}>
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
