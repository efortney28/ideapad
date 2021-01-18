import { useEffect } from "react";
import { useFeatures } from "../../context/FeaturesContext";
import { List } from "antd";
import { CheckOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import "../../styles/features.css";
import { useAlerts } from "../../context/AlertsContext";
import Alert from "../layout/Alert";

const Features = (props) => {
  const { id } = props;
  const {
    features,
    getFeatures,
    deleteFeature,
    markAsCompleted,
  } = useFeatures();
  const { alert, createAlert } = useAlerts();

  useEffect(() => {
    getFeatures(id);
  }, []);

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
        {features && (
          <List
            dataSource={features}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
                <DeleteFilled
                  className="action"
                  id="deleteFeature"
                  onClick={() => handleDelete(item.id)}
                />
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
