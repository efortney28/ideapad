import AuthProvider from "../../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNav from "./AppNav";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <section className="App">
          <AppNav />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </Router>
    </AuthProvider>
  );
}

export default App;
