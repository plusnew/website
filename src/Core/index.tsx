import { BrowserProvider } from '@plusnew/router';
import plusnew, { component } from 'plusnew';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './core.scss';

export default component(
  __dirname,
  () =>
    <BrowserProvider>
      <div className={styles.app}>
        <Header />
        <Content />
        <Footer />
      </div>
    </BrowserProvider>,
);
