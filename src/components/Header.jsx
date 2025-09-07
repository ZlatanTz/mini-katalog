import styles from './Header.module.css';

export const Header = ({ totalItems = 0, total = 0 }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Product Store</h1>
      <div className={styles.meta}>
        <span className={styles.badge} aria-label="Items in cart">
          {totalItems}
        </span>
        <span className={styles.total}>${total.toFixed(2)}</span>
      </div>
    </header>
  );
};
