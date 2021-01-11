import { useAuth } from "../context/AuthContext";

const AppNav = () => {
  const { signOut } = useAuth();

  return (
    <nav>
      <button onClick={signOut}>Sign Out</button>
    </nav>
  );
};

export default AppNav;
