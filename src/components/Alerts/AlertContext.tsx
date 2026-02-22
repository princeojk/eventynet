import React from "react";
import { useState, createContext } from "react";
// import type { AlertStatus } from "../../types";

interface AlertProps {
  children: React.ReactNode;
}

interface AlertContextType {
  alert: string | null;
  alertText: string | null;
  success: (text: string, timeout: number) => void;
  error: (text: string, timeout: number) => void;
  clear: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);
AlertContext.displayName = "AlertContext";

const AlertProvider: React.FC<AlertProps> = ({ children }) => {
  const [alert, setAlert] = useState<string | null>(null);
  const [alertText, setAlertText] = useState<string | null>(null);

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        alertText: alertText,
        success: (text: string) => {
          setAlertText(text);
          setAlert("success");
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        },
        error: (text: string) => {
          setAlertText(text);
          setAlert("error");
          setTimeout(() => {
            setAlertText(null);
          }, 3000);
        },
        clear: () => setAlert(null),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
