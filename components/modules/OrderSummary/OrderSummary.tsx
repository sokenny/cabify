import { useAppContext } from "../../../contexts/AppContext";
import Button from "../../elements/Button/Button";
import styles from "./OrderSummary.module.scss";

const OrderSummary: React.FC = () => {
  const { checkout } = useAppContext();
  return (
    <aside className={styles.OrderSummary}>
      <h2>Order Summary</h2>
      <ul className={styles.items}>
        <li>
          <span>{checkout.cart.length} Items</span>
          <span>
            {checkout.grossTotal()}
            <span className={styles.currency}>€</span>
          </span>
        </li>
      </ul>
      <div className={styles.discounts}>
        <div>Discounts</div>
        <ul>
          {checkout.getDiscountsApplied().map((discount, i) => (
            <li key={`${discount.label}${i}`}>
              <span>{discount.label}</span>
              <span>-{discount.priceDiscounted}€</span>
            </li>
          ))}
          <li>
            <span>Promo code</span>
            <span>0€</span>
          </li>
        </ul>
      </div>
      <div className={styles.total}>
        <ul>
          <li>
            <span className={styles.cost}>Total cost</span>
            <span className={styles.price}>{checkout.total()}€</span>
          </li>
        </ul>
        <Button>Checkout</Button>
      </div>
    </aside>
  );
};

export default OrderSummary;
