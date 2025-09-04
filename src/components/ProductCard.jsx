import styles from './ProductCard.module.css';

export const ProductCard = ({
  title,
  price,
  image,
  isFeatured,
  onAdd,
  onDetails,
}) => {
  return (
    <article className={`${styles.card} ${isFeatured ? styles.featured : ''}`}>
      <figure className={styles.image}>
        <img src={image} alt={title} />
        {isFeatured && (
          <figcaption className={styles.badge}>Featured</figcaption>
        )}
      </figure>

      <h3 className={styles.name}>{title}</h3>
      <p className={styles.price}>${price.toFixed(2)}</p>

      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.details}`}
          onClick={onDetails}
        >
          Details
        </button>
        <button className={`${styles.button} ${styles.add}`} onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};
