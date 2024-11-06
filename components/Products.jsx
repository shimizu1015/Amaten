import React from "react";
import styles from "./Products.module.css";
import next from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export function Products(props) {
  console.log(props.items);
  const items = props.items.Items || [];
  console.log(items);
  const router = useRouter();

  const q = router.query.q;

  return (
    <div className={styles.content}>
      <h1 className={styles.result}> 検索商品一覧</h1>
      <div className={styles.cards}>
        {/* マップ */}
        {items.map((item, index) => {
          //なんかよくわからんけど、これが無いと動かない たぶんuseEffectが終わるまでデータがないから
          const { Item } = item || {};
          const { mediumImageUrls } = Item || {};
          //詳細ページに持っていくオブジェクト。アイテムコードを渡して、向こうでふぇっち
          const data = {
            id: item.Item.itemCode,
          };
          return (
            //特殊な手法（returnのうえにmapで　const { Item } = item || {};　によりデータを出力するため
            //Headの要素が設定できない？（そもそもコンポーネントです）
            <div key={index} className={styles.card}>
              {/* asは、リンク先（動的ルーティングになってるよ）queryに詳細ページで出すデータを持たせてます。 */}
              <Link
                as={`/${data.id}`}
                href={{ pathname: `/[id]`, query: data }}
                onClick={(e) => {
                  //とりあえずコメントアウトしとく　新しいタブを開く仕様にしたのでブラウザバック機能はいらない
                  // リンク先のurlのrouter.push
                  // router.push({
                  //   pathname: `/${data.id}`,
                  //   query: {
                  //     q,
                  //   },
                  // });
                }}
                target="_blank" // 新しいタブで開くための属性
              >
                {mediumImageUrls && mediumImageUrls.length > 0 && (
                  //画像url
                  <img src={mediumImageUrls[0]?.imageUrl} alt="画像" />
                )}
                {/* タイトルとプライス */}
                <p className={styles.title}> {item.Item.itemName}</p>
                <p className={styles.price}> Price: {item.Item.itemPrice}円</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
