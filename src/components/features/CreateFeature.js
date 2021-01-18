import { useState } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { Input } from "antd";

const CreateFeature = (props) => {
  const { createFeature } = useProjects();
  const { id, handleNewFeatureClick } = props;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    createFeature(id, title, description);
    title = null;
    description = null;
  };

  return (
    <section>
      <Input
        className="form-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Feature Title"
      />
      <Input
        className="form-input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Feature Description"
      />
    </section>
  );
};

export default CreateFeature;
