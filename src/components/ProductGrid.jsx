import { ProductCard } from './ProductCard';
import { useCallback, useMemo } from 'react';
import styles from './ProductGrid.module.css';

export const ProductGrid = ({
  products,
  error,
  loading,
  onAdd,
  query = '',
  sortOrder = 'price-asc',
  featuredOnly = false,
}) => {
  const handleDetails = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      if (product) alert(`Cijena je $${product.price}`);
    },
    [products]
  );

  const visible = useMemo(() => {
    let out = [...products];
    if (query) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (featuredOnly) out = out.filter((p) => p.isFeatured);
    if (sortOrder === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-desc') out.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'rating-desc')
      out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return out;
  }, [products, query, featuredOnly, sortOrder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch data</p>;
  if (!visible.length) return <p>No results</p>;

  return (
    <div className={styles.grid}>
      {visible.map(({ id, title, price, image, isFeatured, rating }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          image={image}
          isFeatured={isFeatured}
          rating={rating}
          onAdd={() => onAdd({ id, title, price })}
          onDetails={handleDetails}
        />
      ))}
    </div>
  );
};
