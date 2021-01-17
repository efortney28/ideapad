import { useState, useRef } from "react";
import { useFeatures } from "../../context/FeaturesContext";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Feature = (props) => {
  const { id, title, description, completed } = props.feature;
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { editFeature, deleteFeature } = useFeatures();
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const handleDelete = () => {
    deleteFeature(props.docID, id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titleRef);
    editFeature(
      props.docID,
      id,
      titleRef.current.value,
      descriptionRef.current.value,
      completed
    );
    setEdit(false);
  };

  if (edit) {
    return (
      <section className="feature-form">
        <input
          className="form-input"
          type="text"
          ref={titleRef}
          placeholder={title}
        />

        <input
          className="form-input"
          type="text"
          ref={descriptionRef}
          placeholder={description}
        />

        <button className="submit" onClick={handleSubmit}>
          Update Feature
        </button>
      </section>
    );
  }

  return (
    <section className="feature">
      <h5>{title}</h5>
      <p>{description}</p>
      <p>Completed: {completed ? "true" : "false"}</p>
      <EditFilled onClick={handleEdit} />
      <DeleteFilled onClick={handleDelete} />
    </section>
  );
};

export default Feature;
