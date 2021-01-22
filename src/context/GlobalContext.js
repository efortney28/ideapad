import { useContext, useState, createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const GlobalContext = createContext();

const GlobalProvider = (props) => {
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
      // Need to confirm it was made ?
    } catch (e) {
      console.log(e.message);
      // display error
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

      // Confirm feature was made?
    } catch (e) {
      console.log(e);
      // display error
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

  return (
    <GlobalContext.Provider
      value={{
        projects,
        createProject,
        createFeature,
        getProjects,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
