import { useContext } from "react";
import AlertContext from "./AlertContext";
import css from "./Alert.module.scss";

const Alert = () => {
  const alert = useContext(AlertContext);
  const isSuccess = alert?.alert === "success";
  if (alert?.alertText !== null) {
    return (
      <p className={`${css.alert} ${isSuccess ? css.success : css.error}`}>
        {alert?.alertText}
      </p>
    );
  } else {
    return null;
  }
};

export default Alert;
