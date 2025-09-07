import { Button } from './ui/Button';

export const CartSidebar = ({
  cart,
  onChangeQty,
  onRemove,
  onClear,
  onCheckout,
  isProcessing,
  totalItems,
  subtotal,
  discount,
  total,
  coupon,
  onCouponChange,
}) => {
  const isEmpty = totalItems === 0;

  return (
    <aside aria-label="Shopping cart" style={{ position: 'sticky', top: 16 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <h2>Cart</h2>
        <Button
          variant="ghost"
          onClick={onClear}
          disabled={isEmpty || isProcessing}
          aria-label="Clear cart"
        >
          Clear
        </Button>
      </header>

      {isEmpty ? (
        <p>No items.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto',
                gap: 8,
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div>${item.price.toFixed(2)}</div>
              </div>

              <input
                type="number"
                min={0}
                value={item.qty}
                onChange={(e) =>
                  onChangeQty(
                    item.id,
                    Math.max(0, parseInt(e.target.value || '0', 10))
                  )
                }
                aria-label={`Quantity for ${item.title}`}
                style={{ width: 64 }}
              />

              <div style={{ textAlign: 'right', width: 80 }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <Button
                variant="ghost"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.title}`}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Coupon
          <input
            type="text"
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder="SAVE10"
            aria-label="Coupon code"
            style={{ display: 'block', marginTop: 4, width: '100%' }}
          />
        </label>

        <div style={{ display: 'grid', gap: 4, marginBottom: 8 }}>
          <div>
            Items: <strong>{totalItems}</strong>
          </div>
          <div>
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div>
            Discount: <strong>−${discount.toFixed(2)}</strong>
          </div>
          <div>
            Total: <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <Button
          style={{ width: '100%' }}
          onClick={onCheckout}
          disabled={isEmpty || isProcessing}
          aria-busy={isProcessing || undefined}
        >
          {isProcessing ? 'Processing…' : 'Checkout'}
        </Button>
      </div>
    </aside>
  );
};
