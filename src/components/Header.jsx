import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Product Store</h1>
      <p className={styles.subtitle}>
        Browse our collection and add your favorites to the cart
      </p>
    </header>
  );
};
