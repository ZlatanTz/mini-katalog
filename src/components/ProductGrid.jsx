import { ProductCard } from './ProductCard';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './ProductGrid.module.css';

export const ProductGrid = ({ onAdd }) => {
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const productsWithFeatured = res.data.map((p, i) => ({
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
      {products.map((product) => {
        const { id, title, price, image, isFeatured } = product;
        return (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            image={image}
            isFeatured={isFeatured}
            onAdd={() => onAdd(product)}
            onDetails={() => handleDetails(product.id)}
          />
        );
      })}
    </div>
  );
};
