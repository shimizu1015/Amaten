import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { Products } from "../components/Products";
import { HeaderBottom } from "../components/HeaderBottom";

export default function Home() {
  const router = useRouter();
  const [productData, setProductData] = useState({});
  const [Q, setQ] = useState("");
  const [TotalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    // headerから検索クエリを受け取って、必要な処理を実行
    console.log("検索クエリ:", query);

    //router.pushによってurlを変えて、履歴も残している
    router.push({ pathname: "/", query: { q: query } }, undefined, {
      shallow: true,
    });
    console.log("ルーターの処理後クリエ：" + router.query.q);
  };

  //urlのクエリの変更で発火
  useEffect(() => {
    const fetchProductData = async () => {
      //router.query.qでurlの　/?q=xxxx を取り出す
      const q = router.query.q;
      let p = router.query.page;
      console.log("useEffect testページ: " + p);
      console.log("useEffect testクエリ: " + q);

      if (!p) {
        console.log("pが空です");
        //debug
        p = 1;
      }

      setCurrentPage(parseInt(p));
      setQ(router.query.q);
      //デバッグ用
      console.log("useEffect内：" + q);
      if (!q) {
        console.log("qが空です");
        return;
      }
      //qをもとに楽天apiを呼び出す。
      const res = await fetch(
        `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=1056567340057185285
        &keyword=${q}&hits=27&page=${p}`
      );
      console.log(q);
      //返ってきたオブジェクトをjson化してProductDataに入れる。もともとjsonな気もするけど
      const productData = await res.json();

      //useStateにsetしておく
      setProductData(productData);

      //CurrentPageの値を設定

      console.log(productData.count);
      let c = await Math.ceil(productData.count / 27);
      if (c <= 100) {
        setTotalPage(c);
      } else {
        setTotalPage(100);
      }

      console.log(TotalPage);
    };

    fetchProductData();
  }, [router.query.q, router.query.page]);

  const handlePage = (page) => {
    const q = router.query.q;

    setCurrentPage(page);
    router.push({
      pathname: "/",
      query: {
        q,
        page,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>Amaten.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Ten.ico" />
      </Head>
      {/* 検索クリエの関数を渡す */}
      <Header onSearch={handleSearch} val={Q} />
      <HeaderBottom />

      {router.query.q ? (
        <>
          {/* 商品データを渡す */}

          {/* <p>検索商品数：{productData.count}</p>
          <p>検索ページ数（上限100）：{TotalPage}</p> */}
          <Products items={productData} />
          {/* ページネーション機能*/}
          <div className={styles.pages}>
            {/* ページ番号リストを作成 */}
            <ul className={styles.page}>
              {/* 最初にリンクを表示する条件 */}
              {currentPage > 1 && (
                <li onClick={() => handlePage(1)} style={{ cursor: "pointer" }}>
                  最初
                </li>
              )}
              {/* 前にリンクを表示する条件 */}
              {currentPage > 1 && (
                <li
                  onClick={() => handlePage(currentPage - 1)}
                  style={{ cursor: "pointer" }}
                >
                  前に
                </li>
              )}
              {/* 表示するページ番号の範囲を計算 */}
              {(() => {
                // 最初のページ番号
                let startPage = parseInt(currentPage) - 2;
                // 最後のページ番号
                let endPage = parseInt(currentPage) + 2;
                // 最初のページ番号が1より小さい場合は1にする
                if (startPage < 1) {
                  startPage = 1;
                }
                // 最後のページ番号がTotalPageより大きい場合はTotalPageにする
                if (endPage > TotalPage && TotalPage != 0) {
                  endPage = TotalPage;
                }
                // ページ番号の配列を作成;
                console.log(currentPage);
                const pages = Array(endPage - startPage + 1)
                  .fill()
                  .map((_, i) => startPage + i);
                // ページ番号の配列をマップしてリストを作成
                return pages.map((page) => (
                  <li
                    key={page}
                    onClick={() => handlePage(page)}
                    className={page === currentPage ? styles.active : ""}
                    style={{ cursor: "pointer" }}
                  >
                    {page}
                  </li>
                ));
              })()}
              {/* 次にリンクを表示する条件 */}
              {currentPage < TotalPage && (
                <li
                  onClick={() => handlePage(currentPage + 1)}
                  style={{ cursor: "pointer" }}
                >
                  次に
                </li>
              )}
              {/* 最後にリンクを表示する条件 */}
              {currentPage < TotalPage && (
                <li
                  onClick={() => handlePage(TotalPage)}
                  style={{ cursor: "pointer" }}
                >
                  最後
                </li>
              )}
            </ul>
          </div>
        </>
      ) : (
        <Banner />
      )}

      <Footer />
    </div>
  );
}
