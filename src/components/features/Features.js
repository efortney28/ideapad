import { useEffect, useState } from "react";
import { useFeatures } from "../../context/FeaturesContext";
import Feature from "./Feature";

const Features = (props) => {
  const { id } = props;
  const { features, getFeatures } = useFeatures();

  useEffect(() => {
    getFeatures(id);
  }, []);

  if (features) {
    return (
      <section className="features-container">
        {features &&
          features.map((feature) => (
            <Feature feature={feature} docID={id} key={feature.id} />
          ))}
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
