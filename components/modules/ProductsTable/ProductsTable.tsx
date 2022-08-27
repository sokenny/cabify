import { Product } from "../../../types";
import { Checkout } from "../../../utils/cart";
import TableHead from "../../elements/TableHead/TableHead";
import ProductRow from "../../elements/ProductRow/ProductRow";
import styles from "./ProductsTable.module.scss";

const ProductsTable: React.FC<{ products: Product[]; checkout: Checkout }> = ({
  products,
  checkout,
}) => {
  return (
    <div className={styles.ProductsTable}>
      <TableHead />
      <ul className={styles.list}>
        {products.map(product => (
          <ProductRow
            product={product}
            checkout={checkout}
            key={product.code}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsTable;
