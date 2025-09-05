import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { useCallback, useState, useEffect } from 'react';
import { Toolbar } from './components/Toolbar';
import axios from 'axios';

function App() {
  const [addedList, setAddedList] = useState([]);

  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('price-asc');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

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

  const handleAdd = useCallback((product) => {
    setAddedList((prev) =>
      prev.includes(product.id) ? prev : [...prev, product.id]
    );
  }, []);

  useEffect(() => {
    console.log('Updated addedList:', addedList);
  }, [addedList]);

  return (
    <>
      <Header />
      <Toolbar
        query={query}
        sortOrder={sortOrder}
        featuredOnly={featuredOnly}
        onQueryChange={setQuery}
        onSortChange={setSortOrder}
        onFeaturedChange={setFeaturedOnly}
      />
      <ProductGrid
        error={error}
        products={products}
        loading={loading}
        onAdd={handleAdd}
        query={query}
        sortOrder={sortOrder}
        featuredOnly={featuredOnly}
      />
      <Footer />
    </>
  );
}

export default App;
