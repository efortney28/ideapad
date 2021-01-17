import { useState } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { Button, Input } from "antd";

const CreateProject = () => {
  const { createProject } = useProjects();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    createProject(title, description);
    setTitle(null);
    setDescription(null);
  };

  return (
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
  );
};

export default CreateProject;
