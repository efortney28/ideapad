import { useRef } from "react";
import { useProjects } from "../../context/ProjectsContext";

const CreateFeature = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { createFeature } = useProjects();
  const { id, handleNewFeatureClick } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    createFeature(id, titleRef.current.value, descriptionRef.current.value);
    titleRef.current.value = null;
    descriptionRef.current.value = null;
    handleNewFeatureClick();
  };

  return (
    <section>
      <h5>New Feature</h5>
      <input
        className="form-input"
        type="text"
        ref={titleRef}
        placeholder="Feature Title"
      />
      <input
        className="form-input"
        type="text"
        ref={descriptionRef}
        placeholder="Feature Description"
      />
      <button className="submit" onClick={handleSubmit}>
        Add New Feature
      </button>
    </section>
  );
};

export default CreateFeature;
