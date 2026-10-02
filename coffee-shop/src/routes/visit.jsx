import PageHero from "../components/PageHero";

export function meta() {
  return [{ title: "Visit · Alder Coffee" }];
}

export default function VisitPage() {
  return (
    <>
      <PageHero
        compact
        title="Come say hello"
        text="Look for the green awning on Linden and Third. The door is usually propped open."
        image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/contact"
        primaryLabel="Send a note"
        secondaryTo="/menu"
        secondaryLabel="See the menu"
      />

      <section className="page-panel">
        <dl className="visit-details">
          <div>
            <dt>Hours</dt>
            <dd>
              Mon to Fri, 7am to 5pm
              <br />
              Sat and Sun, 8am to 4pm
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>
              214 Linden Street
              <br />
              Portland, OR 97214
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href="tel:+15035550182">(503) 555-0182</a>
            </dd>
          </div>
          <div>
            <dt>Getting here</dt>
            <dd>
              Street parking on Linden. Bike racks out front. A few tables by the
              window if you want to stay awhile.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
