import styles from "./HeaderBottom.module.css";

export function HeaderBottom() {
  return (
    <div className={styles.HeaderBottom}>
      <div className={styles.nav}>すべて</div>
      <div className={styles.nav}>Amaten Pay: 残高</div>
      <div className={styles.nav}>ヘルプ</div>
      <div className={styles.nav}>ランキング</div>
    </div>
  );
}
