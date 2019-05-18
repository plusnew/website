import { BrowserProvider } from '@plusnew/router';
import plusnew, { component } from 'plusnew';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';

export default component(
  __dirname,
  () =>
    <BrowserProvider>
      <Header />
      <Content />
      <Footer />
    </BrowserProvider>,
);
