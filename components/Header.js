import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/step">
        <a>Step</a>
      </Link>
    </div>
  );
}
