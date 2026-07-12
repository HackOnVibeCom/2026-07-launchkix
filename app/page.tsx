import { MeshBackground } from "@/components/layout/MeshBackground";
import patterns from "@/styles/patterns.module.css";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className="appShell">
      <MeshBackground />
      <main className={styles.main}>
        <span className={styles.badge}>Phase 0 · Bootstrap ready</span>
        <h1 className={styles.title}>
          Lauch<span className={styles.accent}>Kix</span>
        </h1>
        <p className={styles.lead}>
          Ship the app. We&apos;ll ship the launch. AI marketing kits for newly
          launched mobile apps — store listings, ASO, social, email.
        </p>
        <div className={`${patterns.glassCard} ${patterns.edgeLight} ${styles.card}`}>
          <p>Design system online. Next: UI primitives, then AI generation.</p>
          <ul className={styles.statusList}>
            <li>
              <span className={styles.dot} aria-hidden />
              Next.js App Router
            </li>
            <li>
              <span className={styles.dot} aria-hidden />
              Noviq tokens (OKLCH · dark-first)
            </li>
            <li>
              <span className={styles.dot} aria-hidden />
              Mesh + glass + grain surfaces
            </li>
            <li>
              <span className={styles.dot} aria-hidden />
              Motion tokens + Framer MotionConfig
            </li>
          </ul>
        </div>
        <p className={styles.meta}>Built for HackOnVibe · Business Success track</p>
      </main>
    </div>
  );
}
