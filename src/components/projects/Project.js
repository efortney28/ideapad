import { useRef, useState } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import FeaturesProvider from "../../context/FeaturesContext";
import CreateFeature from "../features/CreateFeature";
import Features from "../features/Features";

const Project = (props) => {
  const { id, title, description } = props.project;
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { editProject, deleteProject } = useProjects();
  const [edit, setEdit] = useState(false);
  const [feature, setFeature] = useState(false);

  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const handleNewFeatureClick = () => {
    setFeature((prevState) => !prevState);
  };

  const handleDelete = () => {
    deleteProject(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleRef);
    editProject(id, titleRef.current.value, descriptionRef.current.value);
    setEdit(false);
  };

  if (edit) {
    return (
      <section className="project-form">
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
          Update Project
        </button>
      </section>
    );
  }

  return (
    <section className="project">
      <h4 className="project-title">{title}</h4>
      <p className="project-description">{description}</p>
      <EditFilled onClick={handleEdit} />
      <DeleteFilled onClick={handleDelete} />
      <button onClick={handleNewFeatureClick}>Add Feature</button>
      {feature && (
        <CreateFeature id={id} handleNewFeatureClick={handleNewFeatureClick} />
      )}
      <FeaturesProvider>
        <Features id={id} />
      </FeaturesProvider>
    </section>
  );
};

export default Project;
