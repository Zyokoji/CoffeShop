import { Link } from "react-router";
import { formatPrice } from "../../lib/format";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

export default function MenuItem({ item }) {
  const { add } = useCart();

  return (
    <article className="menu-item">
      <Link to={`/menu/${item.slug}`} className="menu-item-media">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="menu-item-body">
        <div className="menu-item-top">
          <h3>
            <Link to={`/menu/${item.slug}`}>{item.name}</Link>
          </h3>
          <span className="price">{formatPrice(item.price)}</span>
        </div>
        <p>{item.blurb}</p>
        <Button variant="soft" onClick={() => add(item)}>
          Add to cart
        </Button>
      </div>
    </article>
  );
}
