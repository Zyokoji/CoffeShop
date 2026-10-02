import PageHero from "../components/PageHero";

export function meta() {
  return [{ title: "About · Alder Coffee" }];
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        compact
        title="A neighborhood coffee room"
        text="Alder started as a small roasting project and turned into a place people linger."
        image="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/visit"
        primaryLabel="Visit us"
        secondaryTo="/careers"
        secondaryLabel="Join the team"
      />

      <section className="page-panel prose">
        <h2>Why we opened</h2>
        <p>
          We wanted a calm spot with honest coffee. No long list of syrups. No
          rush to turn tables. Just good drinks, warm light, and room to sit.
        </p>
        <h2>How we work</h2>
        <p>
          Beans roast upstairs a few days a week. Downstairs we keep the bar
          simple so every cup gets the attention it deserves. If something tastes
          off, tell us. We would rather remake it than shrug.
        </p>
      </section>
    </>
  );
}
