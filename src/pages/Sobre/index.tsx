import img1 from '../../assets/sobre2.png';
import img2 from '../../assets/sobre1.png';
import img3 from '../../assets/sobre3.png';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 180px;
`;

const Column = styled.section``;

const Title = styled.h1`
  margin-top: 50px;
  font-size: 20px;
  font-weight: 700;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -30px;
`;

const Subtitle = styled.h3`
  width: 200px;
  text-align: left;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 0px;
`;

const Text = styled.p`
  width: 750px;
  margin-bottom: 0;
  margin-top: 2px;
`;

const HelpTitle = styled.h2`
  margin-top: 60px;
  font-size: 16px;
  font-weight: 400;
`;

const ContactButton = styled.button`
  width: 290px;
  height: 80px;
  background-color: #94426e;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const FirstImage = styled.img`
  margin-top: 30px;
`;

const SecondImage = styled.img`
  width: 570px;
  height: 850px;
  object-fit: fill;
  margin-top: -50px;
`;

const BottomBanner = styled.img`
  width: 100%;
  margin-top: 20px;
  height: 1000px;
`;

const ChatIcon = styled(IoChatbubbleOutline).attrs({
  color: '#fff',
  size: 24,
})``;
export default function Sobre() {
  return (
    <>
      <Container>
        <Title>Sobre a AL SKIN</Title>
        <SectionContainer>
          <Column>
            <Subtitle>QUEM SOMOS</Subtitle>
            <Text>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </Text>

            <Subtitle>POR QUE EXISTIMOS?</Subtitle>
            <Text>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </Text>

            <Subtitle>O QUE A GENTE FAZ?</Subtitle>
            <Text>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo
            </Text>

            <FirstImage src={img1} alt="imagem do produto" />
          </Column>
          <Column>
            <SecondImage src={img2} alt="imagem do produto" />
            <HelpTitle>VAMOS CONVERSAR?</HelpTitle>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>
            <ContactButton>
              <ChatIcon />
              Fale conosco
            </ContactButton>
          </Column>
        </SectionContainer>
      </Container>

      <BottomBanner src={img3} alt="imagem do produto" />
    </>
  );
}
