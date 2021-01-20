import { useContext, useState, createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const ProjectsContext = createContext();

const ProjectsProvider = (props) => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();

  const createProject = async (title, description) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .add({
          title: title,
          description: description,
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getProjects = () => {
    try {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .onSnapshot((qs) => {
          let projectList = [];
          qs.forEach((doc) => {
            const proj = doc.data();
            proj.id = doc.id;
            projectList.push(proj);
            console.log(proj);
          });
          setProjects(projectList);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const editProject = async (id, title, description = null) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(id)
        .update({
          title: title,
          description: description,
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProject = async (id) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(id)
        .delete();
    } catch (e) {
      console.log(e);
    }
  };

  const createFeature = async (id, title, description = null) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(id)
        .collection("features")
        .add({
          title: title,
          description: description,
          completed: false,
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        createProject,
        getProjects,
        editProject,
        deleteProject,
        createFeature,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export default ProjectsProvider;
