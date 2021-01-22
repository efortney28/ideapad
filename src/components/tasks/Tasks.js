import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext";
import { useAuth } from "../../context/AuthContext";
import { List, Popconfirm, Progress } from "antd";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import "../../styles/tasks.css";

const Tasks = (props) => {
  const { projectId, featureId } = props;
  const {
    tasks,
    getTasks,
    deleteTask,
    markAsCompleted,
    getProgress,
  } = useTasks();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getTasks(projectId, featureId);

      return unsubscribe;
    }
  }, [currentUser, projectId, featureId]);

  const handleDelete = (taskId) => {
    deleteTask(projectId, featureId, taskId);
  };

  const handleCompletedToggle = (taskId, prevCompleted) => {
    markAsCompleted(projectId, featureId, taskId, prevCompleted);
  };

  return (
    <section className="tasks">
      <Progress
        className="progress-bar"
        percent={getProgress()}
        status="active"
        strokeColor={"#06d6a0"}
      />
      <List
        dataSource={tasks}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta title={item.title} description={item.description} />
            <Popconfirm
              title="Are you sure you want to delete this task?"
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
    </section>
  );
};

export default Tasks;
