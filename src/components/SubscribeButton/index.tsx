import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe-js";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

interface ExtendedSession extends Session {
  activeSubscription?: any;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    console.log(session);

    if ((session as ExtendedSession).activeSubscription) {
      router.push("/posts");
      return {
        props: {},
        redirect: undefined,
      };
    }

    try {
      const response = await api.post("/checkout_sessions");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      alert("An error ocurred");
      console.log(err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  );
}
