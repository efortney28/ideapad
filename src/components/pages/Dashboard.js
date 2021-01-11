import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <section className="dashboard">
        <h2>Dashboard</h2>
        {currentUser && JSON.stringify(currentUser)}
      </section>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
