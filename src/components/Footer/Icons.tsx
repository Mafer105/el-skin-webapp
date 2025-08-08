import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaYoutube,
  FaPinterest,
  FaTwitterSquare,
  FaLinkedin,
  FaSpotify,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import styled from 'styled-components';

const DivIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const socialMediaIcons: IconType[] = [
  FaInstagramSquare,
  FaFacebookSquare,
  FaYoutube,
  FaPinterest,
  FaTwitterSquare,
  FaLinkedin,
  FaSpotify,
];

const StyledIconWrapper = styled.div`
  & > svg {
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export default function SocialIcons() {
  return (
    <DivIcons>
      {socialMediaIcons.map((IconComponent, index) => (
        <StyledIconWrapper key={index}>
          <IconComponent key={index} size={32} color="#6F6E6E" />
        </StyledIconWrapper>
      ))}
    </DivIcons>
  );
}
