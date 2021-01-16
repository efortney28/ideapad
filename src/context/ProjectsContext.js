import { useContext, useState, createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const ProjectsContext = createContext();

const ProjectsProvider = (props) => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [currentProject, setCurrentProject] = useState();

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
  };

  const editProject = async (id, title, description) => {
    const updatedProj = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("projects")
      .doc(id)
      .update({
        title: title,
        description: description,
      });
  };

  const deleteProject = async (id) => {
    const deletedProject = await db
      .collection("users")
      .doc(currentUser.uid)
      .collection("projects")
      .doc(id)
      .delete();
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        currentProject,
        createProject,
        getProjects,
        editProject,
        deleteProject,
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
