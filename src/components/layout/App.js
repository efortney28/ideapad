import AuthProvider from "../../context/AuthContext";
import AlertsProvider from "../../context/AlertsContext";
import ProjectsProvider from "../../context/ProjectsContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNav from "./AppNav";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AppFooter from "./AppFooter";

function App() {
  return (
    <AlertsProvider>
      <AuthProvider>
        <ProjectsProvider>
          <Router>
            <section className="App">
              <AppNav />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
              </Switch>
              <AppFooter />
            </section>
          </Router>
        </ProjectsProvider>
      </AuthProvider>
    </AlertsProvider>
  );
}

export default App;
