import { CatPhoto } from '@/components/cat-photo'

import styles from './style.module.css'

// Lives in the footer, which the page scrolls off to reveal. No trigger and
// no menu: it is simply the bottom of the site.
export const AboutPanel = () => (
  <div className={styles.panel}>
    <section className={styles.section}>
      <h2>who i am</h2>
      <p>
        Sam O&rsquo;Leary. I build software, mostly interfaces and the
        unglamorous parts underneath them.
      </p>
      <a href="https://neonanomaly.io" target="_blank" rel="noreferrer">
        neonanomaly.io
      </a>
    </section>

    <section className={styles.section}>
      <h2>built in the open</h2>
      <p>
        The point of this site is to showcase my expertise in a way that brings
        me joy. Check out the repo; proof this ish isn&rsquo;t vibe coded
        &#x1F60E;
      </p>
      <a
        href="https://github.com/samblackk/lunchbox"
        target="_blank"
        rel="noreferrer"
      >
        github.com/samblackk/lunchbox
      </a>
    </section>

    <section className={styles.section}>
      <div className={styles.coffee}>
        <CatPhoto />

        <div>
          <p>
            Tater Beans McGee supervises every commit and has never once
            approved one. A coffee keeps us both going.
          </p>
          <a
            href="https://buymeacoffee.com/samoleary"
            target="_blank"
            rel="noreferrer"
          >
            buymeacoffee.com/samoleary
          </a>
        </div>
      </div>
    </section>
  </div>
)
