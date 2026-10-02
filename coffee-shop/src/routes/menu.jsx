import PageHero from "../components/PageHero";
import MenuSection from "../components/Menu/MenuSection";
import { getCategories, getMenuItems } from "../lib/shop";

export function meta() {
  return [{ title: "Menu · Alder Coffee" }];
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") || "All";
  const [items, categories] = await Promise.all([
    getMenuItems(category),
    getCategories(),
  ]);
  return { items, categories, category };
}

export default function MenuPage({ loaderData }) {
  return (
    <>
      <PageHero
        compact
        title="The menu"
        text="Drinks and a few baked things. Everything is made to order, so give us a minute."
        image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/checkout"
        primaryLabel="Go to checkout"
        secondaryTo="/cart"
        secondaryLabel="View cart"
      />
      <MenuSection
        items={loaderData.items}
        categories={loaderData.categories}
      />
    </>
  );
}
