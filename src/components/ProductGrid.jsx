import { ProductCard } from './ProductCard';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import styles from './ProductGrid.module.css';

export const ProductGrid = ({
  onAdd,
  query = '',
  sortOrder = 'price-asc',
  featuredOnly = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const handleDetails = useCallback(
    (id) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        alert(`Cijena je $${product.price}`);
      }
    },
    [products]
  );

  const visible = useMemo(() => {
    let out = [...products];

    if (query) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (featuredOnly) {
      out = out.filter((p) => p.isFeatured);
    }
    if (sortOrder === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-desc') out.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'rating-desc')
      out.sort((a, b) => a.rating + b.rating);

    return out;
  }, [products, query, featuredOnly, sortOrder]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const productsWithRating = res.data.map((p) => ({
          ...p,
          rating: parseFloat((Math.random() * (5 - 1) + 1).toFixed(1)),
        }));
        const productsWithFeatured = productsWithRating.map((p, i) => ({
          ...p,
          isFeatured: i % 2 === 0,
        }));
        setProducts(productsWithFeatured);
      } catch (err) {
        console.error('Fetching from api failed', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch data</p>;

  return (
    <div className={styles.grid}>
      {visible.map((product) => {
        const { id, title, price, image, isFeatured, rating } = product;
        return (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            image={image}
            rating={rating}
            isFeatured={isFeatured}
            onAdd={() => onAdd(product)}
            onDetails={() => handleDetails(product.id)}
          />
        );
      })}
    </div>
  );
};
