import styles from "./TableHead.module.scss";

const TableHead: React.FC = () => {
  return (
    <ul className={styles.TableHead}>
      <li className={styles.headers}>
        <div className={styles.colProduct}>Product details</div>
        <div className={styles.colQuantity}>Quantity</div>
        <div className={styles.colPrice}>Price</div>
        <div className={styles.colTotal}>Total</div>
      </li>
    </ul>
  );
};

export default TableHead;
