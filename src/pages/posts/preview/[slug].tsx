import { getPrismicClient } from "@/services/prismic";
import { asText } from "@prismicio/richtext";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { stringify } from "querystring";
import styles from "../post.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Session } from "next-auth";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

interface ExtendedSession extends Session {
  activeSubscription?: any;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ((session as ExtendedSession)?.activeSubscription) {
      router.push(`/posts/${post.slug.replace("slug=", "")}`);
    }
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>
          <div className={styles.continueReading}>
            Do you want to continue reading?
            <Link href="/">
              <span>Subscribe now!</span>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = stringify(params);

  const prismic = getPrismicClient();

  const response = await prismic.getByUID(
    "post",
    slug.replace("slug=", ""),
    {}
  );

  const post = {
    slug,
    title: asText(response.data.title),
    content: asText(response.data.content.splice(0, 3)),
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
    redirect: 60 * 30, // 30 minutes
  };
};
