import { getPrismicClient } from "@/services/prismic";
import { asText } from "@prismicio/richtext";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

interface CustomSession {
  user?: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
  activeSubscription?: object;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Minimum</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = (await getSession({ req })) as CustomSession;
  const slug = stringify(params);

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient();

  const response = await prismic.getByUID(
    "post",
    slug.replace("slug=", ""),
    {}
  );

  const post = {
    slug,
    title: asText(response.data.title),
    content: asText(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "en-us",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
