import Head from "next/head";
import styles from "../styles/profile.module.css"; //後々変更
import { useEffect, useState, useCallback } from "react";
import { db } from "../components/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { Footer } from "../components/Footer";
import { HeaderBottom } from "../components/HeaderBottom";
import { Header } from "../components/Header";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51ORxK1IuiRcO51iMfukuAUWWt4zrwV1KGlVMTaqjAf5hggjpg92yi4gKmNK0iKXl5PE9aCHNCVd9PBCPspAF6rdA00v9uGAsN0"
);

export default function success() {
  const [Name, setName] = useState("");
  const router = useRouter();

  //マウント時に誰がログインしているか確認する。クッキーを見てる（多分）
  useEffect(() => {
    //asyncのためにfetchDataを定義
    const StateProfile = async () => {
      //これで誰がログインしているか分かる
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        //ユーザがいれば
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        //debugログ
        console.log(docSnap.data().AmatenPay);
        setName(docSnap.data().name);
        console.log(router.asPath);
        //ここからコードを書いてください
        const sessionIdIndex = router.asPath.indexOf("session_id=");
        if (sessionIdIndex !== -1) {
          const session_id = router.asPath.substring(sessionIdIndex + 11);
          console.log("session_id:", session_id);
          // ここで session_id を使って必要な処理を行う

          const lineItems = await stripe.checkout.sessions.listLineItems(
            session_id
          );
          console.log(lineItems);
          const objectCount = Object.keys(lineItems).length;
          console.log(objectCount);
          // const lineArray = JSON.stringify(lineItems);
          // console.log(lineArray);
          // const ItemArray = JSON.parse(lineArray);
          // console.log(ItemArray);
          const Array = [];

          // これが無いと拡張for文が使えない このforないで全部できるかもしれんけど　無理な気がする
          for (let i = 0; i < objectCount - 1; i++) {
            Array.push(lineItems.data[i]);
            console.log("ループ中");
          }

          // checkouts コレクションを作成
          const checkoutsRef = collection(db, "users", uid, "checkouts");
          // let checkoutDocRef = doc(checkoutsRef, session_id);

          Array.forEach(async (element, index) => {
            //ここに必要なデータを初期化

            const now = new Date();
            const time = now.getTime();

            //わざわざこんなことしてるのはdebugの余波
            console.log(element);
            let description = element.description;
            let total = element.amount_total;
            let img = element.price.metadata.img;
            let item_url = element.price.metadata.item;

            // 問題　リマウントで再度書き込み （カートからの購入のみ）　stripeのチェックアウトセッションをうまく利用できなかったため
            await addDoc(checkoutsRef, {
              description,
              total,
              img,
              item_url,
              time,
            });

            console.log("書き込み中");
            if (index === objectCount - 2) {
              setTimeout(async () => {
                //一秒待機　笑　forEach やめろ　for使えば行けるよ
                console.log("1秒待機後");
                window.location.href = "/history";
              }, 1000);
            }
          });
        }
      });
    };
    StateProfile();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Amaten|購入完了画面</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Ten.ico" />
      </Head>
      <Header />
      <HeaderBottom />
      <div className={styles.content}>succses!!</div>

      <Footer />
    </div>
  );
}