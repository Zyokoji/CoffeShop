import { Link, useSearchParams } from "react-router";
import MenuItem from "./MenuItem";

export default function MenuSection({ items, categories }) {
  const [params] = useSearchParams();
  const active = params.get("category") || "All";

  return (
    <section className="menu-section" id="menu">
      <div className="section-intro">
        <h2>What we are pouring</h2>
        <p>
          Simple drinks made carefully. If you are unsure, ask us. We will help
          you pick something you will actually like.
        </p>
      </div>

      <div className="filters" role="tablist" aria-label="Menu categories">
        {categories.map((category) => {
          const to =
            category === "All" ? "/menu" : `/menu?category=${category}`;
          return (
            <Link
              key={category}
              to={to}
              role="tab"
              aria-selected={active === category}
              className={active === category ? "filter is-active" : "filter"}
            >
              {category}
            </Link>
          );
        })}
      </div>

      <div className="menu-grid">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
