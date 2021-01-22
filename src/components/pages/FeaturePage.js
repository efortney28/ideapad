import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFeatures } from "../../context/FeaturesContext";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TasksContext";
import {
  Button,
  Card,
  Input,
  message,
  Modal,
  Popconfirm,
  Progress,
} from "antd";
import {
  CheckOutlined,
  DeleteFilled,
  EditFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";
import "../../styles/featurepage.css";
import Tasks from "../tasks/Tasks";

const FeaturePage = (props) => {
  const { projectId, featureId } = props;
  const { currentUser } = useAuth();
  const { createTask } = useTasks();
  const { Meta } = Card;
  const {
    feature,
    getFeature,
    editFeature,
    deleteFeature,
    markAsCompleted,
  } = useFeatures();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newTask, setNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();

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
    setNewTitle(null);
    setNewDescription(null);
    setEdit(false);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleNewTaskClick = () => {
    setNewTask(true);
  };

  const handleCompletedToggle = (prevCompleted) => {
    markAsCompleted(projectId, featureId, prevCompleted);
  };

  const handleOk = () => {
    if (!taskTitle) {
      return message.error("Title field must be completed.");
    }
    createTask(projectId, featureId, taskTitle, taskDescription);
    setTaskTitle(null);
    setTaskDescription(null);
    setNewTask(false);
  };

  const handleCancel = () => {
    setNewTask(false);
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
          <span className="add-ft-btn">
            <PlusSquareOutlined
              id="add"
              className="action"
              onClick={handleNewTaskClick}
            />
          </span>
          <CheckOutlined
            className={"check action " + (feature.completed ? "completed" : "")}
            onClick={() => handleCompletedToggle(feature.completed)}
          />
        </section>
        {newTask && (
          <Modal
            title="Create New Task"
            visible={newTask}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Add Task
              </Button>,
            ]}
          >
            <section>
              <Input
                className="project-input"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task Title"
              />
              <Input
                className="project-input"
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
              />
            </section>
          </Modal>
        )}

        <Tasks projectId={projectId} featureId={featureId} />
      </Card>
    </section>
  );
};

export default FeaturePage;
