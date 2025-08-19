'use client';

import React, { useMemo } from 'react';
import Image from 'next/image'; 
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import styles from './CartModal.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: Readonly<CartModalProps>) {
  const { items, updateQuantity, removeItem } = useCart();

  const cartTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
    >
      <div className={styles.modalContainer}>
        <header className={styles.modalHeader}>
          <h2 id="cart-modal-title">Carrinho</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Fechar carrinho"
          >
            <FaTimes />
          </button>
        </header>

        <div className={styles.modalContent}>
          {items.length === 0 ? (
            <div className={styles.emptyCartMessage}>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.itemContainer}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80} 
                      height={80} 
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <div className={styles.itemControls}>
                        <span className={styles.quantityLabel}>Quantidade</span>
                        <div className={styles.quantityControl}>
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className={styles.quantityButton}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <FaMinus />
                          </button>
                          <span className={styles.quantityDisplay}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={styles.quantityButton}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button
                          title="Remover item"
                          onClick={() => removeItem(item.id)}
                          className={styles.removeButton}
                          aria-label={`Remover ${item.name} do carrinho`}
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className={styles.itemPrice}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalPrice}>{formatPrice(cartTotal)}</span>
              </div>

              <button className={styles.finalizeButton}>Finalizar compra</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}