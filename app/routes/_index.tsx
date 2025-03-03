import type { MetaFunction } from '@remix-run/node';
import { FeedContainer } from '../components/FeedContainer/FeedContainer';
import * as styles from './index.css';
import '../styles/global.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'Pinterest-style Feed' },
    { name: 'description', content: 'A Pinterest-style feed with videos, images, and advertisements' },
  ];
};

export default function Index() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pinterest-style Feed</h1>
        <p className={styles.description}>
          Khám phá feed với video, hình ảnh và quảng cáo theo phong cách Pinterest
        </p>
      </header>
      
      <main>
        <FeedContainer />
      </main>
    </div>
  );
}