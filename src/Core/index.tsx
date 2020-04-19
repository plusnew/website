import { BrowserProvider } from "@plusnew/router";
import plusnew, { component, Try } from "@plusnew/core";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./core.scss";
import i18n from "shared/Components/i18n";

export default component(__dirname, () => (
  <Try catch={() => "An error occured, sorry about that"}>
    {() => (
      <BrowserProvider>
        <i18n.Provider language={window.navigator.language.slice(0, 2)}>
          <div class={styles.app}>
            <Header />
            <Content />
            <Footer />
          </div>
        </i18n.Provider>
      </BrowserProvider>
    )}
  </Try>
));
