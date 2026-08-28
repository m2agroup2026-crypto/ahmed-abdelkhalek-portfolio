
import styles from "./CinematicHandoff.module.css";

export default function CinematicHandoff() {
  return (
    <div className={styles.handoff} aria-hidden="true">

      <div className={styles.grid} />

      <div className={styles.flow}>
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.nodes}>
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className={styles.core}>
        <small>NETWORK</small>
        <strong>SYNCHRONIZED</strong>
      </div>

    </div>
  );
}
