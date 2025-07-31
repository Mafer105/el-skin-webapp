import Input from '../Input';
import { IoBagHandleOutline } from 'react-icons/io5';
import Menu from '../Menu';
import { useSearchContext } from '../../context/SearchContext';
import { useState } from 'react';
import CartModal from '../CartModal';
import { useCartContext } from '../../context/CartContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;
  margin-left: 100px;
  margin-right: 100px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #f0f0f0;
  }
`;

export default function Header() {
  const { search, setSearch } = useSearchContext();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { totalItems } = useCartContext();

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
  }

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  return (
    <div style={{ borderBottom: '1px solid #ccc' }}>
      <Container>
        <h1>AL SKIN</h1>
        <Input
          value={search}
          onChange={handleOnChange}
          onSearchClick={onClickSearch}
          aria-label="Campo de  busca de produtos"
        />
        <Actions>
          <CartButton onClick={handleOnClickCart} aria-label="Abrir carrinho">
            <IoBagHandleOutline size={24} />
            {totalItems > 0 && <span>{totalItems}</span>}
          </CartButton>
        </Actions>
      </Container>
      <Menu />
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCart} />
    </div>
  );
}
