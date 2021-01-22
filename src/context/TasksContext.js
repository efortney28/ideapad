import { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { message } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const TasksContext = createContext();

const TasksProvider = (props) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState();

  const createTask = async (
    projectId,
    featureId,
    title,
    description = null
  ) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(projectId)
        .collection("features")
        .doc(featureId)
        .collection("userTasks")
        .add({
          title: title,
          description: description,
          completed: false,
        });

      message.success("Task created successfully.");
    } catch (e) {
      console.log(e);
    }
  };

  const getTasks = async (projectId, featureId) => {
    try {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(projectId)
        .collection("features")
        .doc(featureId)
        .collection("userTasks")
        .onSnapshot((qs) => {
          let taskList = [];
          qs.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;
            taskList.push(task);
          });
          setTasks(taskList);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTask = async (projectId, featureId, taskId) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(projectId)
        .collection("features")
        .doc(featureId)
        .collection("userTasks")
        .doc(taskId)
        .delete();

      message.success("Task deleted successfully.");
    } catch (e) {
      console.log(e);
    }
  };

  const markAsCompleted = async (
    projectId,
    featureId,
    taskId,
    prevCompleted
  ) => {
    if (prevCompleted) {
      try {
        await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("projects")
          .doc(projectId)
          .collection("features")
          .doc(featureId)
          .collection("userTasks")
          .doc(taskId)
          .update({
            completed: false,
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("projects")
          .doc(projectId)
          .collection("features")
          .doc(featureId)
          .collection("userTasks")
          .doc(taskId)
          .update({
            completed: true,
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    tasks.forEach((task) => {
      totalTasks += 1;
      if (task.completed) {
        completedTasks += 1;
      }
    });
    let progress = completedTasks / totalTasks;
    return Math.floor(progress * 100);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        markAsCompleted,
        getProgress,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};

export default TasksProvider;
