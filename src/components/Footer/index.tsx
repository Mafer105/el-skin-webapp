import Icons from './Icons';
import styles from './Footer.module.css';
import Column from './Column';

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

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.icons}>
        <Icons />
      </div>
      <div className={styles.text}>
        {footerData.map((column) => (
          <Column
            key={column.title}
            title={column.title}
            links={column.links}
            path={column.path}
          />
        ))}
      </div>
    </section>
  );
}
