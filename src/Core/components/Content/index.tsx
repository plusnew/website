import plusnew, { Async, component } from "@plusnew/core";
import { Invalid, NotFound } from "@plusnew/router";
import DocumentTitle from "shared/Components/DocumentTitle";
import Loader from "shared/Components/Loader";
import LoadError from "../util/LoadError";
import AboutRoute from "./components/AboutRoute";
import DocumentationRoute from "./components/DocumentationRoute";
import GuideRoute from "./components/GuideRoute";
import LandingPageRoute from "./components/LandingPageRoute";
import styles from "./content.scss";

export default component(__dirname, () => (
  <article class={styles.content}>
    <LandingPageRoute.Component />
    <DocumentationRoute.Component />
    <AboutRoute.Component />
    <GuideRoute.Component />
    <NotFound>
      <>
        <DocumentTitle value="plusnew | not found" />
        <Async
          pendingIndicator={
            <div>
              <Loader />
            </div>
          }
          constructor={() =>
            import(
              /* webpackChunkName: "site/notFound" */ "./components/NotFound"
            ).catch(() => ({ default: LoadError }))
          }
        >
          {(module) => <module.default />}
        </Async>
      </>
    </NotFound>

    <Invalid>
      <>
        <DocumentTitle value="plusnew | invalid url" />
        <Async
          pendingIndicator={
            <div>
              <Loader />
            </div>
          }
          constructor={() =>
            import(
              /* webpackChunkName: "site/invalid" */ "./components/Invalid"
            ).catch(() => ({ default: LoadError }))
          }
        >
          {(module) => <module.default />}
        </Async>
      </>
    </Invalid>
  </article>
));
