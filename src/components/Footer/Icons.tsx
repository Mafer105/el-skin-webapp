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
import styles from './Footer.module.css'; 

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
    <div className={styles.iconsContainer}>
      {socialMediaIcons.map((IconComponent, index) => (
        <div key={index} className={styles.iconWrapper}>
          <IconComponent size={32} color="#6F6E6E" />
        </div>
      ))}
    </div>
  );
}