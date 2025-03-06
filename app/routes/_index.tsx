import type { MetaFunction } from "@remix-run/node";
import { FeedContainer } from "../components/FeedContainer/FeedContainer";
import * as styles from "./index.css";
import "../styles/global.css";
import { useEffect, useState } from "react";
import { useNavigation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Pinterest-style Feed" },
    {
      name: "description",
      content: "A Pinterest-style feed with videos, images, and advertisements",
    },
  ];
};

export default function Index() {
  const navigation = useNavigation();
  const [isChanging, setIsChanging] = useState(false);
  useEffect(() => {
    if (navigation.state === "loading") {
      setIsChanging(true);
    } else {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  return (
    <div className={styles.container}>
        <main>
          <FeedContainer />
        </main>
    </div>
  );
}
