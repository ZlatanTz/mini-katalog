import { Card } from './ui/Card';
import styles from './ProductCard.module.css';

export const ProductCard = ({
  id,
  title,
  price,
  image,
  isFeatured,
  rating,
  onAdd,
  onDetails,
}) => {
  return (
    <Card className={`${styles.card} ${isFeatured ? styles.featured : ''}`}>
      <Card.Header>
        {isFeatured && <span className={styles.badge}>Featured</span>}
      </Card.Header>

      <Card.Media>
        <img src={image} alt={title} className={styles.mediaImg} />
      </Card.Media>

      <Card.Body>
        <h3 className={styles.name}>{title}</h3>
        <div className={styles.meta}>
          <p className={styles.price}>${price.toFixed(2)}</p>
          <p className={styles.rating} aria-label={`Rating ${rating}`}>
            {rating}
          </p>
        </div>
      </Card.Body>

      <Card.Actions>
        <button
          className={`${styles.button} ${styles.details}`}
          onClick={() => onDetails(id)}
        >
          Details
        </button>
        <button className={`${styles.button} ${styles.add}`} onClick={onAdd}>
          Add to Cart
        </button>
      </Card.Actions>
    </Card>
  );
};
