import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles.module.scss";

import { SignInButton } from "../SignInButton";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>Minimum</h1>
        <nav>
          <Link href="/" className={asPath === "/" ? styles.active : ""}>
            Home
          </Link>
          <Link
            href="/posts"
            className={asPath === "/posts" ? styles.active : ""}
          >
            Posts
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
