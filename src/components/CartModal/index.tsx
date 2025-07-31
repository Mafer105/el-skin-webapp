import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { CartItem, useCartContext } from '../../context/CartContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  background: #2d2d2d;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: white;

  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.header`
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 15px;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #2d2d2d;
  }
  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #3d3d3d;
  border-radius: 8px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: white;
  line-height: 1.3;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const QuantityLabel = styled.span`
  font-size: 0.9rem;
  color: #ccc;
  margin-right: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #4d4d4d;
  border-radius: 6px;
  padding: 5px;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const QuantityDisplay = styled.span`
  background: #5d5d5d;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-left: auto;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  @media (max-width: 768px) {
    order: 2;
    margin-left: 0;
  }
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #a3e635;
  margin-top: auto;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #4d4d4d;
  margin-top: 20px;
`;

const TotalLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
`;

const TotalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #a3e635;
`;

const FinalizeButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #9333ea);
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
  }
`;

// --- React Component ---

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
}: Readonly<CartModalProps>) {
  const { items, removerProduto, updateQuantidade } = useCartContext();

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

  const remover = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantidade(item.id, item.quantity - 1);
    } else {
      removerProduto(item.id);
    }
  };

  const adicionar = (item: CartItem) => {
    updateQuantidade(item.id, item.quantity + 1);
  };

  return (
    <ModalOverlay
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
    >
      <ModalContainer>
        <ModalHeader>
          <h2 id="cart-modal-title">Carrinho</h2>
          <CloseButton onClick={onClose} aria-label="Fechar carrinho">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {items.length === 0 ? (
            <EmptyCartMessage>
              <p>Seu carrinho está vazio</p>
            </EmptyCartMessage>
          ) : (
            <>
              <ItemsList>
                {items.map((item) => (
                  <ItemContainer key={item.id}>
                    <ItemImage src={item.image} alt={item.name} />

                    <ItemInfo>
                      <ItemName>{item.name}</ItemName>

                      <ItemControls>
                        <QuantityLabel>Quantidade</QuantityLabel>
                        <QuantityControl>
                          <QuantityButton
                            onClick={() => remover(item)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <FaMinus />
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton
                            onClick={() => adicionar(item)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <FaPlus />
                          </QuantityButton>
                        </QuantityControl>

                        <RemoveButton
                          title="Remover item"
                          onClick={() => removerProduto(item.id)}
                          aria-label={`Remover ${item.name} do carrinho`}
                        >
                          <FaTrash />
                        </RemoveButton>
                      </ItemControls>

                      <ItemPrice>
                        {formatPrice(item.price * item.quantity)}
                      </ItemPrice>
                    </ItemInfo>
                  </ItemContainer>
                ))}
              </ItemsList>

              <CartTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalPrice>{formatPrice(cartTotal)}</TotalPrice>
              </CartTotal>

              <FinalizeButton>Finalizar compra</FinalizeButton>
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
