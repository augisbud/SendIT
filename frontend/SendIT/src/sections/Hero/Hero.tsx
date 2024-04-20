import styles from "./Hero.module.scss";
import { Button } from "../../components/Button/Button";

export const Hero = () => {
  return (
    <section className={styles["hero"]}>
      <div className={styles["hero__heading"]}>
        <h1>
          Your New Way to Chat <span>Online</span>
        </h1>
        <p>
          Upgrade your online chats with our innovative platform. Experience
          smoother conversations and better connections. Join us and discover a
          new way to interact online.
        </p>
        <Button style={{ padding: "0.5rem 4.5rem", fontSize: "18px" }}>Get Started</Button>
      </div>
    </section>
  );
};
