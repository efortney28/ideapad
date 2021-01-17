import { useRef } from "react";
import { useProjects } from "../../context/ProjectsContext";

const CreateProject = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { createProject } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    createProject(titleRef.current.value, descriptionRef.current.value);
    titleRef.current.value = null;
    descriptionRef.current.value = null;
  };

  return (
    <section className="create-project">
      <h3>New project</h3>
      <form className="project-form">
        <input
          className="project-input"
          type="text"
          ref={titleRef}
          placeholder="Project Title"
        />
        <input
          className="project-input"
          type="text"
          ref={descriptionRef}
          placeholder="Project Description"
        />
        <button className="submit" onClick={handleSubmit}>
          Add New Project
        </button>
      </form>
    </section>
  );
};

export default CreateProject;
