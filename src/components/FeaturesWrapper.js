import FeaturesProvider from "../context/FeaturesContext";
import TasksProvider from "../context/TasksContext";
import FeaturePage from "./pages/FeaturePage";

const FeaturesWrapper = (props) => {
  const { match } = props;
  const {
    params: { projectId, featureId },
  } = match;
  return (
    <FeaturesProvider>
      <TasksProvider>
        <FeaturePage projectId={projectId} featureId={featureId} />
      </TasksProvider>
    </FeaturesProvider>
  );
};

export default FeaturesWrapper;
