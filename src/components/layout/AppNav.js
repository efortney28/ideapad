import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "antd";
import "../../styles/nav.css";

const AppNav = () => {
  const { currentUser, signOut } = useAuth();
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToSignup = () => {
    history.push("/signup");
  };

  return (
    <nav className="nav">
      <section className="brand">IdeaPad</section>
      {currentUser ? (
        <Button className="auth-button" type="text" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <section>
          <Button className="auth-button" type="text" onClick={redirectToLogin}>
            Sign In
          </Button>
          <span id="divider">|</span>
          <Button
            className="auth-button"
            type="text"
            onClick={redirectToSignup}
          >
            Sign Up
          </Button>
        </section>
      )}
    </nav>
  );
};

export default AppNav;
