import Header from '../components/Header';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
        <h1>WebML</h1>
      </div>
    </div>
  );
}
