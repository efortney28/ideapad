import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import CreateProject from "../CreateProject";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { projects, currentProject, getProjects } = useProjects();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getProjects();

      return unsubscribe;
    }
  }, [currentUser]);

  if (currentUser) {
    return (
      <section className="dashboard">
        <h2>Dashboard</h2>
        <CreateProject />
        <section className="projects-container">
          <h3>Your Projects</h3>
          {projects &&
            projects.map((project, ind) => (
              <section className="project" key={ind}>
                <h4 className="project-title">{project.title}</h4>
                <p className="project-description">{project.description}</p>
              </section>
            ))}
        </section>
      </section>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
