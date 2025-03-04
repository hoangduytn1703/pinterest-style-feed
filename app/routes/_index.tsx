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
      <main>
        <FeedContainer />
      </main>
    </div>
  );
}