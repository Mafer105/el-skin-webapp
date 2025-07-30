import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import React, { useMemo } from 'react';
import { CartItem, useCartContext } from '../../context/CartContext';
import styles from './CartModal.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarModal({
  isOpen,
  onClose,
}: Readonly<CartModalProps>) {
  const { items, removerProduto, updateQuantidade } = useCartContext();

  const cartTotal = useMemo(() => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return total;
  }, [items]);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

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

  const remover = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantidade(item.id, item.quantity - 1);
    } else deleteItem(item.id);
  };

  const adicionar = (item: CartItem) => {
    updateQuantidade(item.id, item.quantity + 1);
  };

  const deleteItem = (itemId: string) => {
    removerProduto(itemId);
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
          <button
            className={styles.cart_modal_close}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
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
                        <span className={styles.quantity_label}>
                          Quantidade
                        </span>
                        <div className={styles.quantity_controls}>
                          <button
                            className={styles.quantity_btn}
                            onClick={() => remover(item)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <FaMinus />
                          </button>
                          <span className={styles.quantity_display}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.quantity_btn}
                            onClick={() => adicionar(item)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          className={styles.remove_btn}
                          title="Remover item"
                          onClick={() => deleteItem(item.id)}
                          aria-label={`Remover ${item.name} do carrinho`}
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
                <span className={styles.total_price}>
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <button className={styles.finalize_btn}>Finalizar compra</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
