import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "@/components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "@/services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
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
            <span>for {product.amount} monthly</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1MbiR4Bv3Ppl7AI8H0m4Y3It");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
