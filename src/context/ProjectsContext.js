import { useContext, createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const ProjectsContext = createContext();

const ProjectsProvider = (props) => {
  const { currentUser } = useAuth();

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

  return (
    <ProjectsContext.Provider
      value={{
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
