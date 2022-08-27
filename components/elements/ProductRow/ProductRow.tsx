import { Product } from "../../../types";
import { Checkout } from "../../../utils/cart";
import styles from "./ProductRow.module.scss";

const ProductRow: React.FC<{ product: Product; checkout: Checkout }> = ({
  product,
  checkout,
}) => {
  const handleScan = () => {
    checkout.scan(product.code);
  };
  const handleRemove = () => {
    checkout.remove(product.code);
  };

  return (
    <li className={styles.ProductRow}>
      <div className={styles.colProduct}>
        <figure className={styles.image}>
          <img src={product.image} alt="Shirt" />
          <div className={styles.description}>
            <h3>{product.name}</h3>
            <p className={styles.code}>Product code {product.code}</p>
          </div>
        </figure>
      </div>
      <div className={styles.colQuantity}>
        <button className={styles.count} onClick={handleRemove}>
          -
        </button>
        <input
          type="text"
          className={styles.quantity}
          value={checkout.itemQty(product.code)}
          readOnly
        />
        <button className={styles.count} onClick={handleScan}>
          +
        </button>
      </div>
      <div className={styles.colPrice}>
        <span className={styles.price}>{product.price}</span>
        <span className={styles.currency}>€</span>
      </div>
      <div className={styles.colTotal}>
        <span className={styles.price}>{checkout.itemTotal(product.code)}</span>
        <span className={styles.currency}>€</span>
      </div>
    </li>
  );
};

export default ProductRow;
