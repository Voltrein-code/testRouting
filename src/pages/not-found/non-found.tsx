import { Link } from "react-router-dom";
import styles from "./non-found.module.css";
export default function NotFound() {
  return (
    <>
      <h1>404 Error Page</h1>
      <p className={styles.zoomArea}>
      </p>
      <section className={styles.errorContainer}>
        <span>4</span>
        <span>
          <span className={styles.screenReaderText}>0</span>
        </span>
        <span>4</span>
      </section>
      <div className={styles.linkContainer}>
        <Link
          to="/"
          className={styles.morelink}
        >
         Перейти на главну страницу
        </Link>
      </div>
    </>
  );
}
