import { useEffect, useState } from "react";
import { useFeatures } from "../../context/FeaturesContext";
import { Button, Input, List, Modal, Popconfirm, Progress } from "antd";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import "../../styles/features.css";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";

const Features = (props) => {
  const { id } = props;
  const {
    features,
    getFeatures,
    editFeature,
    deleteFeature,
    markAsCompleted,
    getProgress,
  } = useFeatures();
  const { alert, createAlert } = useAlerts();
  const [editFlag, setEditFlag] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();

  useEffect(() => {
    getFeatures(id);
  }, []);

  const toggleEditFlag = () => {
    setEditFlag(true);
  };

  const handleOk = (featId, title, description = null) => {
    if (!newTitle) {
      return createAlert("Error", "Title field must be completed.");
    }

    try {
      editFeature(id, featId, title, description);
      setNewTitle = null;
      setNewDescription = null;
      createAlert("Success", "Feature saved successfully.");
    } catch (e) {
      createAlert("Error", "Problem saving feature.");
    }

    setEditFlag(false);
  };

  const handleCancel = () => {
    setEditFlag(false);
  };

  const handleCompletedToggle = (featureId, prevCompleted) => {
    markAsCompleted(id, featureId, prevCompleted);
  };

  const handleDelete = (featId) => {
    try {
      deleteFeature(id, featId);
      createAlert("Success", "Feature deleted successfully.");
    } catch (e) {
      createAlert("Error", "There was a problem deleting the feature.");
    }
  };

  if (features) {
    return (
      <section className="features-container">
        {}
        <Progress
          className="progress-bar"
          percent={getProgress()}
          status="active"
          strokeColor={"#06d6a0"}
        />
        {features && (
          <List
            dataSource={features}
            renderItem={(item) => (
              <List.Item key={item.title}>
                {editFlag && (
                  <Modal
                    title="Edit Feature"
                    visible={editFlag}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                      <Button key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        onClick={() =>
                          handleOk(item.id, newTitle, newDescription)
                        }
                      >
                        Edit Feature
                      </Button>,
                    ]}
                  >
                    {alert && (
                      <Alert type={alert.type} message={alert.message} />
                    )}
                    <Input
                      className="project-input"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder={item.title}
                    />
                    <Input
                      className="project-input"
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder={item.description}
                    />
                  </Modal>
                )}
                <List.Item.Meta
                  onClick={toggleEditFlag}
                  title={item.title}
                  description={item.description}
                />
                <Popconfirm
                  title="Are you sure you want to delete this feature?"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <DeleteFilled id="deleteFeature" className="action" />
                </Popconfirm>
                <CheckOutlined
                  className={"check " + (item.completed ? "completed" : "")}
                  onClick={() => handleCompletedToggle(item.id, item.completed)}
                />
              </List.Item>
            )}
          ></List>
        )}
      </section>
    );
  } else {
    return (
      <section className="features-container">
        <h5>There are no features to display yet...</h5>
      </section>
    );
  }
};

export default Features;
