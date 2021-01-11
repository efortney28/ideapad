import { useAuth } from "../../context/AuthContext";

const AppNav = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <nav>
      {currentUser ? <button onClick={signOut}>Sign Out</button> : <p>login</p>}
    </nav>
  );
};

export default AppNav;
