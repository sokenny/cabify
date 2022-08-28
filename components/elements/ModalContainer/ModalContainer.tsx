import { useAppContext } from "../../../contexts/AppContext";
import { ReactNode } from "react";
import styles from "./ModalContainer.module.scss";

const ModalContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.ModalContainer}>{children}</div>;
};

export default ModalContainer;
