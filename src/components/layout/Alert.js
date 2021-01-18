import "../../styles/alert.css";

const Alert = ({ type, message }) => {
  return (
    <section className={"alert " + type}>
      <p className="alert-text">
        <strong>{type}:</strong> {message}
      </p>
    </section>
  );
};

export default Alert;
