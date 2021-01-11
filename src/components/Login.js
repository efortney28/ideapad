import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <section className="login">
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </section>
  );
};

export default Login;
