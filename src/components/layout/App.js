import AuthProvider from "../../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNav from "./AppNav";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AppFooter from "./AppFooter";
import GlobalProvider from "../../context/GlobalContext";
import FeaturesWrapper from "../FeaturesWrapper";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <section className="App">
            <AppNav />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route
                path="/project/:projectId/feature/:featureId"
                component={FeaturesWrapper}
              />
            </Switch>
            <AppFooter />
          </section>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
