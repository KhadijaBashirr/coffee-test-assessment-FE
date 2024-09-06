import React from 'react';
import { ItemsList } from './pages/itemsList';
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <CartProvider>
      <ItemsList />
    </CartProvider>
  );
}

export default App;