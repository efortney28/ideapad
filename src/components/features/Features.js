import { useEffect } from "react";
import { useFeatures } from "../../context/FeaturesContext";
import { List } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../../styles/features.css";

const Features = (props) => {
  const { id } = props;
  const { features, getFeatures, markAsCompleted } = useFeatures();

  useEffect(() => {
    getFeatures(id);
  }, []);

  const handleCompletedToggle = (featureId, prevCompleted) => {
    markAsCompleted(id, featureId, prevCompleted);
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
