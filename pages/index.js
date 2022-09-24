import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="farmfreshz.com FRESH FRUITS , VEGETABLE AND  DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
</div>
  )
}
