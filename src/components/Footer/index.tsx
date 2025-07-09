import styles from './Index.module.css'
import { FaInstagramSquare,FaFacebookSquare,FaYoutube,FaPinterest,FaTwitterSquare,FaLinkedin,FaSpotify  } from "react-icons/fa";

export default function Footer () {
    return(
        <section>
            <div className={styles.icons}>
                <FaInstagramSquare />
                <FaFacebookSquare />
                <FaYoutube />
                <FaPinterest />
                <FaTwitterSquare/>
                <FaLinkedin/>
                <FaSpotify/>
            </div>
        </section>
    )
}