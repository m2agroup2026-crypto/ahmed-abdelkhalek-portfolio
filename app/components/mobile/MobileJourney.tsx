'use client';

export default function MobileJourney() {
  const steps = [
    'Discovery',
    'Architecture',
    'Experience Design',
    'Digital Transformation',
  ];

  return (
    <section className="mobile-journey" aria-label="Journey">
      <div className="mobile-section-label">THE JOURNEY</div>
      <h2>From complexity to connected digital systems</h2>
      <div className="mobile-journey-list">
        {steps.map((step, index) => (
          <div className="mobile-journey-item" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
