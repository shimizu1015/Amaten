import Head from "next/head";
import styles from "../styles/profile.module.css";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Footer } from "../components/Footer";
import { HeaderBottom } from "../components/HeaderBottom";
import { Header } from "../components/Header";

export default function location() {
  //マウント時に誰がログインしているか確認する。
  useEffect(() => {
    //asyncのためにfetchDataを定義
    const fetchData = async () => {
      //これで誰がログインしているか分かる
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        //ユーザがいれば
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        //debugログ
        console.log(docSnap.data());
        //追加データ先を用意してからコメントを戻す
        // const citiesRef = collection(db, "users");
        // await setDoc(doc(citiesRef, uid), {
        //   //detaを追加
        //   name: formValues.username,
        //   AmatenPay: 0,
        // });
      });
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Amaten|住所の変更</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Ten.ico" />
      </Head>
      <Header />
      <HeaderBottom />
      <div className={styles.content}>
        <div className={styles.title}>住所の変更</div>
      </div>

      <Footer />
    </div>
  );
}