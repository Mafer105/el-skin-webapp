import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 60px;
  padding-right: 100px;
  margin-left: 100px;
  margin-right: 100px;
  height: 50px;

  ul {
    display: flex;
    gap: 90px;
  }

  li {
    list-style-type: none;
  }
`;
export default function Menu() {
  return (
    <Container>
      <ul>
        <li>
          <p>Categorias</p>
        </li>
        <li>
          <p>Tipo de pele</p>
        </li>
        <li>
          <p>Necessidade</p>
        </li>
        <li>
          <p>Ingredientes</p>
        </li>
      </ul>
      <p style={{ color: '#dc5e5e' }}>
        <strong>Kits até 50% off</strong>
      </p>
    </Container>
  );
}
