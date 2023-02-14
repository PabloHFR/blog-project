import Head from "next/head";

import styles from "./home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Minimum</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>Stay Curious.</h1>
          <p>
            Get access to stories, essays and expertise from writers on any
            topic <br />
            <span>for $9.99 monthly</span>
          </p>
        </section>
      </main>
    </>
  );
}
