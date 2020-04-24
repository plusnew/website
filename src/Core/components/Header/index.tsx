import plusnew, { component } from "@plusnew/core";
import AboutRoute from "Core/components/Content/components/AboutRoute";
import DocumentationRoute from "Core/components/Content/components/DocumentationRoute";
import GuideRoute from "Core/components/Content/components/GuideRoute";
import i18n from "shared/Components/i18n";
import Logo from "./components/Logo";
import github from "./github.png";
import styles from "./header.scss";

export default component(__dirname, () => (
  <i18n.Consumer>
    {({ base }) => (
      <header class={styles.header}>
        <Logo />
        <nav>
          <DocumentationRoute.Link
            parameter={{
              "/": {},
              documentation: {},
            }}
          >
            {base()?.navigation.documentation}
          </DocumentationRoute.Link>
          <GuideRoute.Link
            parameter={{
              "/": {},
              guide: {},
            }}
          >
            {base()?.navigation.guide || ""}
          </GuideRoute.Link>
          <AboutRoute.Link
            parameter={{
              "/": {},
              about: {},
            }}
          >
            {base()?.navigation.about}
          </AboutRoute.Link>
        </nav>
        <div class={styles.external}>
          <a href="https://github.com/plusnew/plusnew" target="_blank">
            <img src={github} />
          </a>
        </div>
      </header>
    )}
  </i18n.Consumer>
));
