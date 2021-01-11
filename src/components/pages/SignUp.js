import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { currentUser, signUpWithEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="signup">
      {currentUser && JSON.stringify(currentUser)}
      <input
        className="email"
        type="email"
        ref={emailRef}
        placeholder="Email"
      />
      <input
        className="password"
        type="password"
        ref={passwordRef}
        placeholder="Password"
      />
      <input
        className="password"
        type="password"
        ref={confirmRef}
        placeholder="Confirm password"
      />
      <button className="submit" onClick={handleSubmit}>
        Create Account
      </button>
    </form>
  );
};

export default SignUp;
