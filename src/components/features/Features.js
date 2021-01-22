import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFeatures } from "../../context/FeaturesContext";
import { List, message, Popconfirm, Progress } from "antd";
import { CheckOutlined, DeleteFilled } from "@ant-design/icons";
import "../../styles/features.css";

const Features = (props) => {
  const { id } = props;
  const {
    features,
    getFeatures,
    deleteFeature,
    markAsCompleted,
    getProgress,
  } = useFeatures();

  useEffect(() => {
    getFeatures(id);
  }, []);

  const handleCompletedToggle = (featureId, prevCompleted) => {
    markAsCompleted(id, featureId, prevCompleted);
  };

  const handleDelete = (featId) => {
    try {
      deleteFeature(id, featId);
      message.success("Feature deleted successfully.");
    } catch (e) {
      message.error("There was a problem deleting the feature.");
    }
  };

  if (features) {
    return (
      <section className="features-container">
        {}
        <Progress
          className="progress-bar"
          percent={getProgress()}
          status="active"
          strokeColor={"#06d6a0"}
        />
        {features && (
          <List
            dataSource={features}
            itemLayout="horizontal"
            renderItem={(item) => (
              <Link to={"/project/" + id + "/feature/" + item.id}>
                <List.Item key={item.title}>
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <Popconfirm
                    title="Are you sure you want to delete this feature?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Delete"
                    cancelText="Cancel"
                  >
                    <DeleteFilled id="deleteFeature" className="action" />
                  </Popconfirm>
                  <CheckOutlined
                    className={"check " + (item.completed ? "completed" : "")}
                    onClick={() =>
                      handleCompletedToggle(item.id, item.completed)
                    }
                  />
                </List.Item>
              </Link>
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
