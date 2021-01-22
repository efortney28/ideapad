import { useState } from "react";
import { useProjects } from "../../context/ProjectsContext";
import FeaturesProvider from "../../context/FeaturesContext";
import Features from "../features/Features";
import { Button, Card, Input, message, Modal, Popconfirm } from "antd";
import "../../styles/project.css";
import {
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useGlobal } from "../../context/GlobalContext";

const Project = (props) => {
  const { id, title, description } = props.project;
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const { editProject, deleteProject } = useProjects();
  const { createFeature } = useGlobal();
  const [edit, setEdit] = useState(false);
  const [feature, setFeature] = useState(false);
  const [featureTitle, setFeatureTitle] = useState();
  const [featureDescription, setFeatureDescription] = useState();
  const { Meta } = Card;

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditOk = () => {
    if (!newTitle) {
      return message.error("Title field must be completed.");
    }
    editProject(id, newTitle, newDescription);
    setNewTitle(null);
    setNewDescription(null);
    setEdit(false);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleNewFeatureClick = () => {
    setFeature((prevState) => !prevState);
  };

  const handleOk = () => {
    if (!featureTitle) {
      return message.error("Title field must be completed.");
    }

    createFeature(id, featureTitle, featureDescription);
    setFeatureTitle(null);
    setFeatureDescription(null);
    setFeature(false);
  };

  const handleCancel = () => {
    setFeature(false);
  };

  const handleDelete = () => {
    deleteProject(id);
  };

  return (
    <section className="project">
      {edit && (
        <Modal
          title="Edit Project"
          visible={edit}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          footer={[
            <Button key="back" onClick={handleEditCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleEditOk}>
              Update Project
            </Button>,
          ]}
        >
          <section className="project-form">
            <Input
              className="project-input"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={title}
              default={title}
            />

            <Input
              className="project-input"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder={description}
            />
          </section>
        </Modal>
      )}
      <Card>
        <Meta title={title} description={description} />
        <section className="project-actions">
          <EditFilled id="edit" className="action" onClick={handleEdit} />
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={handleDelete}
            okText="Delete"
            cancelText="Cancel"
          >
            <DeleteFilled id="delete" className="action" />
          </Popconfirm>
          <span className="add-ft-btn">
            <PlusSquareOutlined
              id="add"
              className="action"
              onClick={handleNewFeatureClick}
            />
          </span>
        </section>
        {feature && (
          <Modal
            title="Create New Feature"
            visible={feature}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Add Feature
              </Button>,
            ]}
          >
            <section>
              <Input
                className="project-input"
                type="text"
                value={featureTitle}
                onChange={(e) => setFeatureTitle(e.target.value)}
                placeholder="Feature Title"
              />
              <Input
                className="project-input"
                type="text"
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
                placeholder="Feature Description"
              />
            </section>
          </Modal>
        )}
        <FeaturesProvider>
          <Features id={id} />
        </FeaturesProvider>
      </Card>
    </section>
  );
};

export default Project;
