import AuthProvider from "../context/AuthContext";
import AppNav from "./AppNav";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  return (
    <AuthProvider>
      <section className="App">
        <AppNav />
        <SignUp />
      </section>
    </AuthProvider>
  );
}

export default App;
