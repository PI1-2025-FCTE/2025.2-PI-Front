import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerBox}>
          <img
            src="/image.png"
            alt="Conector"
            className={styles.icon} // você pode manter a mesma classe
          />
          <span className={styles.headerText}>Conector do Carrinho</span>
        </div>
      </header>

      {/* Botão */}
      <div className={styles.center}>
        <button className={styles.button}>CONECTAR</button>
      </div>
    </main>
  );
}
