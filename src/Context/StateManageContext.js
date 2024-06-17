import { createContext, useContext, useEffect, useState } from "react";
import { mockDataContacts } from "../AdminDashboards/data/mockData";

const StateManagerContext = createContext();

const StateMangerProvider = ({ children }) => {
  const [Loader, setLoader] = useState(false);

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [rows, setRows] = useState(mockDataContacts); // Initial rows state
  // add order Modal controller
  const [Show, setShow] = useState(false);

  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);

  // Login Modal

  const [LoginOpen, setLoginOpen] = useState(false);
  const [SingUp, setSingUp] = useState(false);

  useEffect(() => {
    let timer;

    // Start the timer when the component mounts
    timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          setIsTimerComplete(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update the time remaining every 1 second (1000 milliseconds)

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StateManagerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        rows,
        setRows,
        Show,
        setShow,
        LoginOpen,
        setLoginOpen,
        SingUp,
        setSingUp,
        Loader,
        setLoader,
        timeRemaining,
        setTimeRemaining,
      }}
    >
      {children}
    </StateManagerContext.Provider>
  );
};

const UseStateManager = () => {
  return useContext(StateManagerContext);
};

export { UseStateManager, StateMangerProvider };
