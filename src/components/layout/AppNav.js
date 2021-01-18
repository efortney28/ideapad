import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "antd";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";
import "../../styles/nav.css";

const AppNav = () => {
  const { currentUser, signOut } = useAuth();
  const history = useHistory();
  const { alert, createAlert } = useAlerts();

  const handleSignOut = () => {
    signOut();
    createAlert("Success", "You have been signed out.");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToSignup = () => {
    history.push("/signup");
  };

  return (
    <nav className="nav">
      <section className="brand">
        <span className="thin">idea</span>
        <span className="medium">Pad</span>
      </section>
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
