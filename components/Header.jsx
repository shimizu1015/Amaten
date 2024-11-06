// "use client";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";

export function Header({ onSearch, val }) {
  //hooks
  const [Name, setName] = useState("");
  const [Locate, setLocate] = useState("");
  const [Input, setInput] = useState("");
  const [cart, setCart] = useState(0);
  const router = useRouter();

  //ブラウザバック時のインプットフィールドの変更機能
  useEffect(() => {
    //ぐちゃぐちゃ過ぎて　適当にやった　暇なら直せよ、お前が
    console.log("if前の　val");
    console.log(val); //たぶん消していい
    setInput(val); //たぶん消していい
    if (router.query.q) {
      console.log("ifごの　q");
      console.log(router.query.q);
      setInput(router.query.q);
    } else if (!router.query.q) {
      setInput("");
    }
  }, [val]);
  //マウント時に誰がログインしているか確認する。クッキーを見てる（多分）
  useEffect(() => {
    //asyncのためにfetchDataを定義
    const fetchData = async () => {
      //これで誰がログインしているか分かる
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        //ユーザがいれば　　ここは、そこまで正しく動作していないかも、　ユーザがいなくてもtrueを返した。
        if (user) {
          const uid = user.uid;

          //購入履歴を取得 リアルタイムで取得したい
          const q = query(collection(db, "users", uid, "carts"));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const carts = [];
            querySnapshot.forEach((doc) => {
              console.log(doc);
              carts.push(doc);
              console.log("読み込みました");
            });
            let c = carts.length;
            setCart(c);
            console.log(carts);
            console.log("配列に入れ直しました");
            console.log("useState history の中身");
            console.log(history);
          });

          //usersコレクション
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          //debugログ
          console.log(docSnap.data());
          // Name,Locate をセット
          if (docSnap.data() != undefined) {
            setName(docSnap.data().name);
            setLocate("/myAccountPages");
          } else {
            //アカンウントが削除された場合の処理
            setName("ログイン");
            setLocate("/login");
          }
        } else {
          // User is signed out
          // ...

          setName("ログイン");
          setLocate("/login");
        }
      });
    };

    fetchData();
  }, []);

  //
  const handleSearch = () => {
    // 検索ボタンがクリックされたときの処理
    // 入力欄の値を取得
    const query = document.getElementById("q").value;
    //別ページからの検索機能
    if (router.pathname !== "/") {
      router.push({ pathname: "/", query: { q: query } }, undefined, {
        shallow: true,
      });
    } else {
      // 親コンポーネントに文字列を渡す　onSearchは、indexよりpropsで受け取った関数です。
      onSearch(query);
    }
  };
  //
  const handleHome = () => {
    //indexにて、jsx三項演算子の条件を router.query.q ? にしているために、この関数が必要
    const query = null;
    // 親コンポーネントに文字列を渡す　onSearchは、indexよりpropsで受け取った関数です。
    onSearch(query);
  };

  const qData = (e) => {
    setInput(e.target.value);
  };

  return (
    <header className={styles.header}>
      <Link className={styles.headerLogo} href="/" onClick={handleHome}>
        <img src="/Amaten150px.svg" alt="Amaten" />
      </Link>
      <Link className={styles.nav0} href="">
        <p className={styles.topP}>お届け先</p>
        <p className={styles.botP}>未実装</p>
      </Link>

      <div className={styles.seachBarDiv}>
        <div className={styles.seachBar} action="">
          <input
            className={styles.searchInput}
            type="text"
            //値をインプットにする
            value={Input}
            autocomplete="off"
            placeholder="商品を検索する"
            name="q"
            id="q"
            //入力フィールドが変更されるたびに
            onChange={qData}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className={styles.button} onClick={handleSearch}>
            <img src="/mag.png" alt="Search" />
          </button>
        </div>
      </div>
      <div className={styles.headerNavDiv}>
        <Link className={styles.nav1} href={Locate}>
          <p className={styles.topP}>こんにちは、</p>
          <p className={styles.botP}>{Name}</p>
        </Link>
        <Link className={styles.nav2} href="/history">
          <p className={styles.topP}>返品もこちら</p>
          <p className={styles.botP}>購入履歴</p>
        </Link>
        <Link className={styles.nav3} href="/cart">
          <img src="/cartIcon.png" alt="cart" className={styles.cart} />
          <p className={styles.cartP}>カート</p>
          <span className={styles.span}>{cart}</span>
        </Link>
      </div>
    </header>
  );
}
