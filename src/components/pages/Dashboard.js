import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import CreateProject from "../projects/CreateProject";
import Project from "../projects/Project";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { projects, getProjects } = useProjects();

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
              <Project project={project} key={ind} />
            ))}
        </section>
      </section>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
