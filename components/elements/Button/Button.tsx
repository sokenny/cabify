import styles from "./Button.module.scss";

const Button: React.FC<{ children: string }> = ({ children }) => {
  return (
    <button className={styles.Button} type="submit">
      {children}
    </button>
  );
};

export default Button;
