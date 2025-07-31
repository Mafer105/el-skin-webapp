import { IoIosSearch } from 'react-icons/io';
import React from 'react';
import styled from 'styled-components';
interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSearchClick?: () => void;
  'aria-label': string;
}

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
  padding: 20px;
`;

const InputComponent = styled.input`
  width: 300px;
  height: 30px;
  border: 0;
  background-color: #f5f5f5;
  border-style: none;
  outline: none;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Input({
  value,
  onChange,
  placeholder,
  onSearchClick,
  'aria-label': ariaLabel,
}: Readonly<InputProps>) {
  return (
    <Container>
      <InputComponent
        type="text"
        id="search-input"
        placeholder={placeholder || 'O que você está procurando?'}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      {onSearchClick && (
        <Button onClick={onSearchClick} aria-label="Pesquisar">
          <IoIosSearch size={24} color="#1a1a1aff" />
        </Button>
      )}
    </Container>
  );
}
