"use client";

export default function MobileHero() {
  return (
    <section className="mobile-hero-v2">
      <div className="mobile-identity">
        <span className="mobile-mark">AA</span>
        <p>Ahmed Abdelkhalek</p>
        <span>Digital Experience Architect</span>
      </div>

      <div className="mobile-portrait-placeholder" aria-hidden="true" />

      <h1>
        Transforming complexity
        <br />
        into connected digital systems
      </h1>

      <p className="mobile-hero-description">
        Designing enterprise experiences where strategy, technology and human
        interaction work as one system.
      </p>

      <button className="mobile-primary-action">
        Explore Experience
      </button>
    </section>
  );
}
