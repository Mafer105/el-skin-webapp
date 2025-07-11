import { FaInstagramSquare, FaFacebookSquare, FaYoutube, FaPinterest, FaTwitterSquare, FaLinkedin, FaSpotify } from 'react-icons/fa';
import { IconType } from 'react-icons';
import styles from './Footer.module.css';

// Definimos uma lista com os componentes dos ícones
const socialMediaIcons: IconType[] = [
  FaInstagramSquare,
  FaFacebookSquare,
  FaYoutube,
  FaPinterest,
  FaTwitterSquare,
  FaLinkedin,
  FaSpotify,
];

export default function SocialIcons() {
  return (
    <div className={styles.icons}>
      {socialMediaIcons.map((IconComponent, index) => (
        <IconComponent
          key={index} // Usar o índice como chave é seguro aqui, pois a lista é estática
          size={32}
          color="#6F6E6E"
          className={styles.socialIcon} // Usaremos uma classe para o espaçamento
        />
      ))}
    </div>
  );
}