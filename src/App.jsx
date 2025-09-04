import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { useCallback, useState, useEffect } from 'react';

function App() {
  const [addedList, setAddedList] = useState([]);

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
      <ProductGrid onAdd={handleAdd} />
      <Footer />
    </>
  );
}

export default App;
