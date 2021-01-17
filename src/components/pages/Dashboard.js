import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import Project from "../projects/Project";
import { Button, Input, Modal } from "antd";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { projects, getProjects, createProject } = useProjects();
  const [addNewProject, setAddNewProject] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getProjects();

      return unsubscribe;
    }
  }, [currentUser]);

  const handleClick = (e) => {
    e.preventDefault();

    setAddNewProject((prevState) => !prevState);
  };

  const handleOk = () => {
    createProject(title, description);
    setTitle(null);
    setDescription(null);
    setAddNewProject(false);
  };

  const handleCancel = () => {
    setAddNewProject(false);
  };

  if (currentUser) {
    if (projects) {
      return (
        <section className="dashboard">
          {addNewProject && (
            <Modal
              title="Create New Project"
              visible={addNewProject}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                  Add Project
                </Button>,
              ]}
            >
              <section className="create-project">
                <Input
                  className="project-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project Title"
                />
                <Input
                  className="project-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project Description"
                />
              </section>
            </Modal>
          )}
          <Button type="primary" onClick={handleClick}>
            Open Modal
          </Button>
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
      return (
        <section className="dashboard">
          <h3>There are no projects yet :(</h3>
        </section>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
