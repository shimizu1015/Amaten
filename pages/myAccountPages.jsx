import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Account } from "../components/Account";
import { Footer } from "../components/Footer";
import { HeaderBottom } from "../components/HeaderBottom";
import { Header } from "../components/Header";

export default function myAccount() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Amaten|マイアカウント</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Ten.ico" />
      </Head>
      <Header />
      <HeaderBottom />

      <Account />

      <Footer />
    </div>
  );
}
