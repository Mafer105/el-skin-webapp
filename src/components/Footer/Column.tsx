import { Link } from 'react-router-dom';
interface FooterColumnProps {
  title: string;
  links: string[];
  path:string | null;
}

export default function FooterColumn({ title, links,path }: Readonly<FooterColumnProps>) {
  return (
    <div>
      {path ? (
        <Link to={path} style={{textDecoration:'none',color: 'inherit' }}>
          <h2>{title}</h2>
        </Link>
      ) : (
        <h2>{title}</h2>
      )}

      {links.map((link, index) => (
        <p key={index}>{link}</p>
      ))}
    </div>
  );
}