import { Link } from "react-router";
import PageHero from "../components/PageHero";
import { getOpenJobs } from "../lib/shop";

export function meta() {
  return [{ title: "Careers · Alder Coffee" }];
}

export async function loader() {
  const jobs = await getOpenJobs();
  return { jobs };
}

export default function CareersPage({ loaderData }) {
  return (
    <>
      <PageHero
        compact
        title="Work with us"
        text="We look for kind people who like coffee and do not mind an early morning."
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/contact"
        primaryLabel="Send an intro"
      />

      <section className="page-panel">
        <div className="jobs-list">
          {loaderData.jobs.map((job) => (
            <article key={job.id} className="job-card">
              <div className="menu-item-top">
                <h3>{job.title}</h3>
                <span className="price">{job.type}</span>
              </div>
              <p>{job.blurb}</p>
              <Link className="text-link dark" to="/contact">
                Ask about this role
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
