import Icons from './Icons';
import Column from './Column';
import styled from 'styled-components';

const footerData = [
  {
    title: 'Sobre a AL SKIN',
    path: '/sobre',
    links: ['- quem somos', '- time AL SKIN', '- carreiras'],
  },
  {
    title: 'Loja AL SKIN',
    path: null,
    links: ['- lojas físicas', '- devolução'],
  },
  {
    title: 'Atendimento',
    path: null,
    links: ['- oi@aiskin.com.br', '- ajuda'],
  },
  {
    title: 'Blog AL SKIN',
    path: null,
    links: ['- Minha pele', '- Ingredientes'],
  },
];

const FooterComponent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
  text-align: left;
  h2 {
    font-size: 16px;
    border-bottom: 1px solid #000;
    font-weight: 600;
  }
  p {
    font-size: 0.9rem;
    cursor: pointer;
    color: #878787;
  }
`;

const DivIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

export default function Footer() {
  return (
    <FooterComponent>
      <DivIcons>
        <Icons />
      </DivIcons>
      <Text>
        {footerData.map((column) => (
          <Column
            key={column.title}
            title={column.title}
            links={column.links}
            path={column.path}
          />
        ))}
      </Text>
    </FooterComponent>
  );
}
