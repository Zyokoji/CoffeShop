import PageHero from "../components/PageHero";

export function meta() {
  return [{ title: "Roast · Alder Coffee" }];
}

export default function RoastPage() {
  return (
    <>
      <PageHero
        compact
        title="Roasted upstairs"
        text="Small lots, steady heat, and cups we taste all morning before they hit the bar."
        image="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/menu"
        primaryLabel="Taste it downstairs"
      />

      <section className="page-panel prose">
        <h2>Our approach</h2>
        <p>
          We roast a few days a week in the loft above the shop. That keeps the
          coffee close, and it lets us change course when a lot needs a softer or
          brighter profile.
        </p>
        <h2>What you will taste</h2>
        <p>
          Espresso leans chocolate and caramel. Filter coffees lean fruit and
          florals. Cold brew stays smooth on purpose. If you want the details,
          ask whoever is on bar. They roast too.
        </p>
        <h2>Take beans home</h2>
        <p>
          Bags are on the shelf by the door. Grab what is fresh, or ask us to
          hold a roast for you later in the week.
        </p>
      </section>
    </>
  );
}
