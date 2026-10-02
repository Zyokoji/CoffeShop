import { Link } from "react-router";
import { formatPrice } from "../../lib/format";
import Button from "../ui/Button";
import CartLine from "./CartLine";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const { cart, total, drawerOpen, closeDrawer, clear } = useCart();

  return (
    <>
      <div
        className={drawerOpen ? "cart-backdrop is-open" : "cart-backdrop"}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      />

      <aside
        className={drawerOpen ? "cart-drawer is-open" : "cart-drawer"}
        aria-hidden={!drawerOpen}
        aria-label="Your cart"
      >
        <div className="cart-head">
          <h2>Your order</h2>
          <Button variant="ghost" onClick={closeDrawer}>
            Close
          </Button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">
            Nothing here yet. Grab a drink from the menu when you are ready.
          </p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <CartLine key={item.id} item={item} />
              ))}
            </ul>

            <div className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <Link
                className="btn btn-primary checkout-btn"
                to="/checkout"
                onClick={closeDrawer}
              >
                Checkout
              </Link>
              <Button variant="ghost" onClick={clear}>
                Clear cart
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
