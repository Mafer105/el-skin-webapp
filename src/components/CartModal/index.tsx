import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import React from 'react';
import { CartItem } from '../../context/CartContext';
import styles from './CartModal.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function CarModal({ isOpen, onClose, items }: Readonly<CartModalProps>) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={styles.cart_modal_overlay}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
    >
      <div className={styles.cart_modal}>
        <div className={styles.cart_modal_header}>
          <h2 id="cart-modal-title">Carrinho</h2>
          <button className={styles.cart_modal_close} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.cart_modal_content}>
          {items.length === 0 ? (
            <div className={styles.cart_empty}>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className={styles.cart_items}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cart_item}>
                    <div className={styles.cart_item_image}>
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className={styles.cart_item_info}>
                      <h3 className={styles.cart_item_name}>{item.name}</h3>

                      <div className={styles.cart_item_controls}>
                        <span className={styles.quantity_label}>Quantidade</span>
                        <div className={styles.quantity_controls}>
                          <button
                            className={styles.quantity_btn}
                          >
                            <FaMinus />
                          </button>
                          <span className={styles.quantity_display}>{item.quantity}</span>
                          <button
                            className={styles.quantity_btn}
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          className={styles.remove_btn}
                          title="Remover item"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <div className={styles.cart_item_price}>
                        {item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cart_total}>
                <span className={styles.total_label}>Total</span>
                <span className={styles.total_price}>0</span>
              </div>

              <button
                className={styles.finalize_btn}
              >
                Finalizar compra
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}