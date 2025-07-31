import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ErrorText = styled.span`
  font-size: 18rem;
  font-weight: 900;
  color: #ebebeb;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  user-select: none;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorText>404</ErrorText>
      <Title>Oops! Página não encontrada.</Title>
      <Message>
        O conteúdo que você está procurando não existe ou foi movido para outro
        lugar.
      </Message>
      <ButtonWrapper>
        <StyledButton onClick={() => navigate(-1)}>&larr; Voltar</StyledButton>
        <StyledButton onClick={() => navigate('/')}>
          Ir para a Home
        </StyledButton>
      </ButtonWrapper>
    </Container>
  );
}
