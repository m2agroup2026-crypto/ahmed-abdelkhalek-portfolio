import styles from './mobile-experience-v2.module.css';

const systems = [
  'Digital Governance',
  'Healthcare Platforms',
  'AI Experiences',
  'Enterprise Solutions',
];

export default function MobileSystems() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>SYSTEMS</span>
      <div className={styles.grid}>
        {systems.map((item, index) => (
          <div className={styles.card} key={item}>
            <small>0{index + 1}</small>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
