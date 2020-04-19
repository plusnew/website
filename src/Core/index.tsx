import { BrowserProvider } from "@plusnew/router";
import plusnew, { component } from "@plusnew/core";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./core.scss";

export default component(__dirname, () => (
  <BrowserProvider>
    <div class={styles.app}>
      <Header />
      <Content />
      <Footer />
    </div>
  </BrowserProvider>
));
