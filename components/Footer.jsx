import styles from "./Footer.module.css";

export function Footer() {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.Contents}>
        <div className={styles.MenuTitlesDIV}>
          <aside className={styles.left}></aside>

          <div className={styles.MenuTitles}>
            <div className={styles.MenuTitle}>
              Amaten
              <ul className={styles.Menus}>
                <li className={styles.Menu}>Amatenについて</li>
                <li className={styles.Menu}>採用情報</li>
                <li className={styles.Menu}>企業の社会的責任</li>
                <li className={styles.Menu}>投資家の皆様へ（中国語）</li>
                <li className={styles.Menu}>サプライチェーン</li>
                <li className={styles.Menu}>イベント</li>
                <li className={styles.Menu}>
                  ダイバーシティとインクルージョン
                </li>
                <li className={styles.Menu}>
                  <a
                    href="https://www.flaticon.com/free-icons/clone"
                    title="clone icons"
                  >
                    使用アイコン元リンク
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <aside className={styles.right}></aside>

          <div className={styles.MenuTitles}>
            <div className={styles.MenuTitle}>
              ヘルプ＆ガイド
              <ul className={styles.Menus}>
                <li className={styles.Menu}>新型コロナウイルス関連</li>
                <li className={styles.Menu}>配送料と配送情報</li>
                <li className={styles.Menu}>Amaten プライム</li>
                <li className={styles.Menu}>商品の返品・交換</li>
                <li className={styles.Menu}>コンテンツと端末の管理</li>
                <li className={styles.Menu}>価格について</li>
                <li className={styles.Menu}>お客様サポート</li>
              </ul>
            </div>
          </div>
          <aside className={styles.right}></aside>
          <div className={styles.MenuTitles}>
            <div className={styles.MenuTitle}>
              オフィシャルアカウント
              <ul className={styles.Menus}>
                <li className={styles.Menu}>LINE</li>
                <li className={styles.Menu}>iOSアプリ</li>
                <li className={styles.Menu}>Androidアプリ</li>
              </ul>
            </div>
          </div>
          <aside className={styles.right}></aside>
        </div>
      </div>

      <div className={styles.HVaside}></div>

      <div className={styles.AnothersDiv}>
        <ul className={styles.Anothers}>
          <li className={styles.AnotherFirst} onClick={returnTop}>
            top
          </li>
          <li className={styles.Another}>利用規約</li>
          <li className={styles.Another}>プライバシー</li>
        </ul>
      </div>
      <div className={styles.IncDiv}>
        <p className={styles.Inc}>©1185-1192 Amaten.com, Inc.</p>
      </div>
    </footer>
  );
}
