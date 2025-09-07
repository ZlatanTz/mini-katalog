import styles from './Card.module.css';

function Root({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
function Header({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
}
function Media({ children, className = '' }) {
  return <div className={`${styles.media} ${className}`}>{children}</div>;
}
function Body({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}
function Actions({ children, className = '' }) {
  return <div className={`${styles.actions} ${className}`}>{children}</div>;
}

export const Card = Object.assign(Root, { Header, Media, Body, Actions });
