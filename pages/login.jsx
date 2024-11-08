import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/Footer";
import { LoginForm } from "../components/LoginForm";

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Amaten|ログイン</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Ten.ico" />
      </Head>

      <LoginForm />
      <Footer />
    </div>
  );
}
