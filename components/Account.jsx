import Link from "next/link";
import styles from "./Account.module.css";
import { auth } from "./firebase";

export function Account() {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      location.href = "/login";
    });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.aside}></aside>
      <div className={styles.contents}>
        <div className={styles.title}>
          <h1 className={styles.h1}>アカウントサービス</h1>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <a href="/history">
              <div className={styles.card}>
                <img className={styles.img} src="/PurchaseHistory.png" alt="" />
                <div>
                  <p className={styles.cTitle}>購入履歴</p>
                  <p className={styles.cCont}>配送状況の確認・返品手続き</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <Link href="/amatenPay">
              <div className={styles.card}>
                <img className={styles.img} src="/pay3.png" alt="" />
                <div>
                  <p className={styles.cTitle}>Amaten Pay</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="/Payment Method.png" alt="" />
                <div>
                  <p className={styles.cTitle}>お支払方法の設定</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <Link href="/profile">
              <div className={styles.card}>
                <img className={styles.img} src="/profile.png" alt="" />
                <div>
                  <p className={styles.cTitle}>プロフィール管理</p>
                  <p className={styles.cCont}>ユーザネーム変更</p>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="/accounts.png" alt="" />
                <div>
                  <p className={styles.cTitle}>アカウント切り替え</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="/prime.png" alt="" />
                <div>
                  <p className={styles.cTitle}>Amaten プライム</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <Link href="/location">
              <div className={styles.card}>
                <img className={styles.img} src="/location.png" alt="" />
                <div>
                  <p className={styles.cTitle}>住所の変更</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="/TenA.png" alt="" />
                <div>
                  <p className={styles.cTitle}>Amaten で売る</p>
                  <p className={styles.cCont}>未実装</p>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.cell}>
            <a href="">
              <div className={styles.card}>
                <img className={styles.img} src="/exit.png" alt="" />
                <div>
                  <p
                    className={styles.cTitle}
                    onClick={(e) => handleSignOut(e)}
                  >
                    サインアウト
                  </p>
                  <p className={styles.cCont}>サインアウトします</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <aside className={styles.aside}></aside>
    </div>
  );
}
