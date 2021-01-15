import { useContext, useState, createContext } from "react";

const AlertsContext = createContext();

const AlertsProvider = (props) => {
  const [alert, setAlert] = useState();

  const createAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertsContext.Provider
      value={{
        alert,
        createAlert,
      }}
    >
      {props.children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  return useContext(AlertsContext);
};

export default AlertsProvider;
