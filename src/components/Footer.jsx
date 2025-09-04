import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} My Product Store. Built with
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          React
        </a>
      </p>
    </footer>
  );
};
