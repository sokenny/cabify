import { Product } from "../../../types";
import { closeX } from "../../../utils/icons";
import { useAppContext } from "../../../contexts/AppContext";
import Image from "next/image";
import ModalContainer from "../../elements/ModalContainer/ModalContainer";
import Button from "../../elements/Button/Button";
import styles from "./ProductDetailModal.module.scss";

const ProductDetailModal: React.FC<{ product: Product }> = ({ product }) => {
  const { setModal } = useAppContext();
  function handleCloseModal() {
    setModal(false);
  }
  return (
    <ModalContainer>
      <div className={styles.ProductDetailModal}>
        <div className={styles.close} onClick={handleCloseModal}>
          {closeX()}
        </div>
        <div className={styles.image}>
          <Image src={product.images[1]} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.info}>
          <ul>
            <li>
              <span>{product.name}</span>
              <span>
                {product.price}
                <span>€</span>
              </span>
            </li>
          </ul>
          <div className={styles.description}>{product.description}</div>
          <div className={styles.code}>Product code {product.code}</div>
          <Button>Add to cart</Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ProductDetailModal;
