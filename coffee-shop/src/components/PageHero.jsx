import { Link } from "react-router";

export default function PageHero({
  eyebrow = "Alder Coffee",
  title,
  text,
  image,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
  compact = false,
}) {
  return (
    <section className={compact ? "hero hero-page" : "hero"}>
      <div className="hero-media" aria-hidden="true">
        <img src={image} alt="" />
      </div>

      <div className="hero-copy">
        <p className="brand-mark">{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p className="lede">{text}</p>}
        {(primaryTo || secondaryTo) && (
          <div className="hero-actions">
            {primaryTo && (
              <Link className="btn btn-primary" to={primaryTo}>
                {primaryLabel}
              </Link>
            )}
            {secondaryTo && (
              <Link className="text-link" to={secondaryTo}>
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
