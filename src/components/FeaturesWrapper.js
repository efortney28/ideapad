import FeaturesProvider from "../context/FeaturesContext";
import FeaturePage from "./pages/FeaturePage";

const FeaturesWrapper = (props) => {
  const { match } = props;
  const {
    params: { projectId, featureId },
  } = match;
  console.log(match);
  return (
    <FeaturesProvider>
      <FeaturePage projectId={projectId} featureId={featureId} />
    </FeaturesProvider>
  );
};

export default FeaturesWrapper;
