import { Link } from "react-router";
import PageHero from "../components/PageHero";
import CartLine from "../components/Cart/CartLine";
import Button from "../components/ui/Button";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";

export function meta() {
  return [{ title: "Cart · Alder Coffee" }];
}

export default function CartPage() {
  const { cart, total, clear } = useCart();

  return (
    <>
      <PageHero
        compact
        title="Your cart"
        text="Check everything looks right, then head to checkout when you are ready."
        image="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1800&q=80"
        primaryTo={cart.length ? "/checkout" : "/menu"}
        primaryLabel={cart.length ? "Checkout" : "Browse menu"}
      />

      <section className="page-panel">
        {cart.length === 0 ? (
          <p>Your cart is empty. The menu is waiting.</p>
        ) : (
          <>
            <ul className="cart-list page-cart">
              {cart.map((item) => (
                <CartLine key={item.id} item={item} />
              ))}
            </ul>
            <div className="cart-total page-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div className="inline-actions">
              <Link className="btn btn-primary" to="/checkout">
                Checkout
              </Link>
              <Button variant="ghost" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
