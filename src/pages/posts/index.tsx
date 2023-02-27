import { getPrismicClient } from "@/services/prismic";
import { GetStaticProps } from "next";
import * as Prismic from "@prismicio/client";
import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Minimum</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>27 de fevereiro de 2023</time>
            <strong>
              ChatGPT: The Power and Potential of AI Language Models
            </strong>
            <p>
              The rise of artificial intelligence (AI) has revolutionized
              various industries, including natural language processing (NLP).
              ChatGPT, a large language model developed by OpenAI, has
              demonstrated the power and potential of AI language models to
              transform the way we communicate and interact with technology.
            </p>
          </a>
          <a href="#">
            <time>27 de fevereiro de 2023</time>
            <strong>
              ChatGPT: The Power and Potential of AI Language Models
            </strong>
            <p>
              The rise of artificial intelligence (AI) has revolutionized
              various industries, including natural language processing (NLP).
              ChatGPT, a large language model developed by OpenAI, has
              demonstrated the power and potential of AI language models to
              transform the way we communicate and interact with technology.
            </p>
          </a>
          <a href="#">
            <time>27 de fevereiro de 2023</time>
            <strong>
              ChatGPT: The Power and Potential of AI Language Models
            </strong>
            <p>
              The rise of artificial intelligence (AI) has revolutionized
              various industries, including natural language processing (NLP).
              ChatGPT, a large language model developed by OpenAI, has
              demonstrated the power and potential of AI language models to
              transform the way we communicate and interact with technology.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicate.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  return {
    props: {},
  };
};
