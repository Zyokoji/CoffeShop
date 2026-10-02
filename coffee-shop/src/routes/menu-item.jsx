import { Link } from "react-router";
import PageHero from "../components/PageHero";
import Button from "../components/ui/Button";
import { formatPrice } from "../lib/format";
import { getMenuItemBySlug, getMenuItems } from "../lib/shop";
import { useCart } from "../context/CartContext";

export function meta({ data }) {
  return [{ title: data?.item ? `${data.item.name} · Alder Coffee` : "Drink" }];
}

export async function loader({ params }) {
  const item = await getMenuItemBySlug(params.slug);
  if (!item) {
    throw new Response("Not found", { status: 404 });
  }

  const related = (await getMenuItems(item.category))
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);

  return { item, related };
}

export default function MenuItemPage({ loaderData }) {
  const { add } = useCart();
  const { item, related } = loaderData;

  return (
    <>
      <PageHero
        compact
        eyebrow={item.category}
        title={item.name}
        text={item.blurb}
        image={item.image}
      />

      <section className="detail-section">
        <div className="detail-panel">
          <p className="detail-price">{formatPrice(item.price)}</p>
          <p>{item.details}</p>
          <div className="detail-actions">
            <Button onClick={() => add(item)}>Add to cart</Button>
            <Link className="text-link dark" to="/menu">
              Back to menu
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related">
            <h2>Also in {item.category}</h2>
            <div className="related-list">
              {related.map((entry) => (
                <Link key={entry.id} to={`/menu/${entry.slug}`}>
                  {entry.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
