import styles from './Footer.module.css';
interface FooterColumnProps {
  title: string;
  links: string[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2>{title}</h2>
      {links.map((link, index) => (
        <p key={index}>{link}</p>
      ))}
    </div>
  );
}