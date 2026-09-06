import styles from './mobile-experience-v2.module.css';

const projects = [
  { title: 'Postgraduate Digital Governance Platform', tag: 'Enterprise System' },
  { title: 'AI Healthcare Experience', tag: 'Artificial Intelligence' },
  { title: 'Digital Transformation Systems', tag: 'Business Architecture' },
];

export default function MobileCaseStudies() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>CASE STUDIES</span>
      {projects.map((project) => (
        <article key={project.title} className={styles.card}>
          <span>{project.tag}</span>
          <h3>{project.title}</h3>
          <p>Transforming complex challenges into connected digital experiences.</p>
          <button>Explore Case Study →</button>
        </article>
      ))}
    </section>
  );
}
