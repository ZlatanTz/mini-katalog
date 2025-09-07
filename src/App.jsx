import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { Toolbar } from './components/Toolbar';
import { CartSidebar } from './components/CartSidebar';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

function App() {
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('price-asc');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const withRating = res.data.map((p) => ({
          ...p,
          rating: parseFloat((Math.random() * (5 - 1) + 1).toFixed(1)),
        }));
        const withFeatured = withRating.map((p, i) => ({
          ...p,
          isFeatured: i % 2 === 0,
        }));
        setProducts(withFeatured);
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
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        { id: product.id, title: product.title, price: product.price, qty: 1 },
      ];
    });
  }, []);

  const handleRemove = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleChangeQuantity = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const handleClear = useCallback(() => setCart([]), []);

  const handleCheckout = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCart([]);
      setCoupon('');
      alert('Order placed!');
    }, 1500);
  }, []);

  const filteredProducts = useMemo(() => {
    let out = products;
    if (query) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (featuredOnly) {
      out = out.filter((p) => p.isFeatured);
    }
    return out;
  }, [products, query, featuredOnly]);

  const sortedProducts = useMemo(() => {
    const out = [...filteredProducts];
    if (sortOrder === 'price-asc') out.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'price-desc') out.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'rating-desc')
      out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return out;
  }, [filteredProducts, sortOrder]);

  const cartTotalItems = useMemo(
    () => cart.reduce((n, i) => n + i.qty, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cart]
  );
  const cartDiscount = useMemo(
    () => (coupon.trim().toUpperCase() === 'SAVE10' ? cartSubtotal * 0.1 : 0),
    [coupon, cartSubtotal]
  );
  const cartTotal = useMemo(
    () => Math.max(0, cartSubtotal - cartDiscount),
    [cartSubtotal, cartDiscount]
  );

  return (
    <>
      <Header totalItems={cartTotalItems} total={cartTotal} />

      <Toolbar
        query={query}
        sortOrder={sortOrder}
        featuredOnly={featuredOnly}
        onQueryChange={setQuery}
        onSortChange={setSortOrder}
        onFeaturedChange={setFeaturedOnly}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 20,
          alignItems: 'start',
        }}
      >
        <ProductGrid
          error={error}
          products={sortedProducts}
          loading={loading}
          onAdd={handleAdd}
        />

        <CartSidebar
          cart={cart}
          onRemove={handleRemove}
          onClear={handleClear}
          onChangeQty={handleChangeQuantity}
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
          totalItems={cartTotalItems}
          subtotal={cartSubtotal}
          discount={cartDiscount}
          total={cartTotal}
          coupon={coupon}
          onCouponChange={setCoupon}
        />
      </div>

      <Footer />
    </>
  );
}

export default App;
