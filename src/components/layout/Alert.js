const Alert = ({ type, message }) => {
  return (
    <section className={"alert-" + type}>
      <p>
        <strong>{type}:</strong> {message}
      </p>
    </section>
  );
};

export default Alert;
