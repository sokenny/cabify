import { useAppContext } from "../../../contexts/AppContext";
import ProductDetailModal from "../../modules/ProductDetailModal/ProductDetailModal";
import { Product } from "../../../types";
import { Checkout } from "../../../utils/cart";
import styles from "./ProductRow.module.scss";

const ProductRow: React.FC<{ product: Product; checkout: Checkout }> = ({
  product,
  checkout,
}) => {
  const { setModal } = useAppContext();
  function handleAddItem() {
    checkout.scan(product.code);
  }
  function handleRemoveItem() {
    checkout.remove(product.code);
  }
  function handleClickProduct() {
    setModal(<ProductDetailModal product={product} />);
  }
  return (
    <li className={styles.ProductRow}>
      <div className={styles.colProduct} onClick={handleClickProduct}>
        <figure className={styles.image}>
          <img src={product.images[0]} alt="Shirt" />
          <div className={styles.description}>
            <h3>{product.name}</h3>
            <p className={styles.code}>Product code {product.code}</p>
          </div>
        </figure>
      </div>
      <div className={styles.colQuantity}>
        <button className={styles.count} onClick={handleRemoveItem}>
          -
        </button>
        <input
          type="text"
          className={styles.quantity}
          value={checkout.itemQty(product.code)}
          readOnly
        />
        <button className={styles.count} onClick={handleAddItem}>
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
