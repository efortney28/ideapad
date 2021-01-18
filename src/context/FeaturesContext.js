import { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const FeaturesContext = createContext();

const FeaturesProvider = (props) => {
  const { currentUser } = useAuth();
  const [features, setFeatures] = useState();

  const getFeatures = (id) => {
    try {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(id)
        .collection("features")
        .onSnapshot((qs) => {
          let featuresList = [];
          qs.forEach((doc) => {
            const feature = doc.data();
            feature.id = doc.id;
            featuresList.push(feature);
          });
          setFeatures(featuresList);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const editFeature = async (projID, featureID, title, description) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(projID)
        .collection("features")
        .doc(featureID)
        .update({
          title: title,
          description: description,
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFeature = async (projID, featureID) => {
    try {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("projects")
        .doc(projID)
        .collection("features")
        .doc(featureID)
        .delete();
    } catch (e) {
      console.log(e);
    }
  };

  const markAsCompleted = async (projId, featureId, prevCompleted) => {
    if (prevCompleted) {
      try {
        await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("projects")
          .doc(projId)
          .collection("features")
          .doc(featureId)
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
          .doc(projId)
          .collection("features")
          .doc(featureId)
          .update({
            completed: true,
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <FeaturesContext.Provider
      value={{
        features,
        getFeatures,
        editFeature,
        deleteFeature,
        markAsCompleted,
      }}
    >
      {props.children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => {
  return useContext(FeaturesContext);
};

export default FeaturesProvider;
