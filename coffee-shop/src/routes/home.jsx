import { Link } from "react-router";
import PageHero from "../components/PageHero";
import { formatPrice } from "../lib/format";
import { getFeaturedItems } from "../lib/shop";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";

export function meta() {
  return [
    { title: "Alder Coffee" },
    {
      name: "description",
      content: "Quiet mornings, good coffee, no rush.",
    },
    { property: "og:title", content: "Alder Coffee" },
    {
      property: "og:description",
      content: "Quiet mornings, good coffee, no rush.",
    },
    {
      property: "og:image",
      content: "/brand/exports/alder-share-1200x630.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: "/brand/exports/alder-twitter-1200x600.png",
    },
  ];
}

export async function loader() {
  const featured = await getFeaturedItems();
  return { featured };
}

export default function Home({ loaderData }) {
  const { add } = useCart();
  const { featured } = loaderData;

  return (
    <>
      <PageHero
        title="Quiet mornings, good coffee, no rush."
        text="We roast upstairs and pour downstairs. Come as you are, stay as long as you like."
        image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/menu"
        primaryLabel="See the menu"
        secondaryTo="/visit"
        secondaryLabel="Find us"
      />

      <section className="home-featured">
        <div className="section-intro">
          <h2>Favorites right now</h2>
          <p>A few things people keep coming back for.</p>
        </div>
        <div className="feature-grid">
          {featured.map((item) => (
            <article key={item.id} className="feature-card">
              <Link to={`/menu/${item.slug}`} className="feature-media">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="feature-copy">
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
          ))}
        </div>
      </section>

      <section className="home-strip">
        <div>
          <h2>Roasted upstairs</h2>
          <p>
            Small lots, careful profiles, and beans we actually like drinking.
            Come upstairs on roast days if you want to see the process.
          </p>
          <Link className="text-link dark" to="/roast">
            Our roast story
          </Link>
        </div>
      </section>
    </>
  );
}
