import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/step">
        <a>Step</a>
      </Link>
    </div>
  );
}
