import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, message } from "antd";
import "../../styles/nav.css";

const AppNav = () => {
  const { currentUser, signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    signOut();
    message.success("You are now logged out.");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToSignup = () => {
    history.push("/signup");
  };

  return (
    <nav className="nav">
      <Link to="/">
        <section className="brand">
          <span className="thin">idea</span>
          <span className="medium">Pad</span>
        </section>
      </Link>
      {currentUser ? (
        <Button className="auth-button" type="text" onClick={handleSignOut}>
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
