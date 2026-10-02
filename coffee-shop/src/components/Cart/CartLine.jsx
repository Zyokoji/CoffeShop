import { formatPrice } from "../../lib/format";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

export default function CartLine({ item }) {
  const { updateQuantity, remove } = useCart();

  return (
    <li className="cart-line">
      <div>
        <h4>{item.name}</h4>
        <p>{formatPrice(item.price)}</p>
      </div>

      <div className="cart-line-actions">
        <button
          type="button"
          aria-label={`Fewer ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          aria-label={`More ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <Button variant="ghost" onClick={() => remove(item.id)}>
          Remove
        </Button>
      </div>
    </li>
  );
}
