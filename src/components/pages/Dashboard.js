import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProjectsProvider from "../../context/ProjectsContext";
import { useGlobal } from "../../context/GlobalContext";
import Project from "../projects/Project";
import { Button, Input, message, Modal } from "antd";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { projects, getProjects, createProject } = useGlobal();
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
    if (!title) {
      return message.error("Title field must be completed.");
    }

    createProject(title, description);
    setTitle(null);
    setDescription(null);
    setAddNewProject(false);
  };

  const handleCancel = () => {
    setAddNewProject(false);
  };

  if (currentUser) {
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
        <section className="projects-container">
          {/* <Button
            type="primary"
            onClick={() => {
              connectGoogleAccount();
            }}
          >
            Connect your Google account
          </Button> */}
          <h3>Your Projects</h3>
          <Button className="add-project" type="primary" onClick={handleClick}>
            Create New Project
          </Button>
          {projects &&
            projects.map((project, ind) => (
              <ProjectsProvider>
                <Project className="project" project={project} key={ind} />
              </ProjectsProvider>
            ))}
        </section>
      </section>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Dashboard;
