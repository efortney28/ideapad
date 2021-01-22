import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFeatures } from "../../context/FeaturesContext";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Input, message, Modal, Popconfirm } from "antd";
import {
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";
import "../../styles/featurepage.css";

const FeaturePage = (props) => {
  const { projectId, featureId } = props;
  const { currentUser } = useAuth();
  const { Meta } = Card;
  const { feature, getFeature, editFeature, deleteFeature } = useFeatures();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getFeature(projectId, featureId);

      return unsubscribe;
    }
  }, [currentUser]);

  const handleDelete = () => {
    deleteFeature(projectId, featureId);
    history.push("/");
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEditOk = () => {
    if (!newTitle) {
      return message.error("Title field must be completed.");
    }
    editFeature(projectId, featureId, newTitle, newDescription);
    newTitle = null;
    newDescription = null;
    setEdit(false);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  if (!feature) {
    return (
      <section className="feature-page">
        <h3>No feature was found :(</h3>
      </section>
    );
  }

  return (
    <section className="feature-page">
      {edit && (
        <Modal
          title="Edit Feature"
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
              value={feature.title}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <Input
              className="project-input"
              type="text"
              value={feature.description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </section>
        </Modal>
      )}
      <Card>
        <Meta title={feature.title} description={feature.description} />
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
          {/* <span className="add-ft-btn">
            <PlusSquareOutlined
              id="add"
              className="action"
              onClick={handleEdit}
            />
          </span> */}
        </section>
      </Card>
    </section>
  );
};

export default FeaturePage;
