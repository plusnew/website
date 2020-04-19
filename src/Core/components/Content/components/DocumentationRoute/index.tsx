import plusnew, { Async, component } from "@plusnew/core";
import DocumentTitle from "shared/Components/DocumentTitle";
import Error from "shared/Components/Error";
import i18n from "shared/Components/i18n";
import Loader from "shared/Components/Loader";
import landingPageRoute from "../LandingPageRoute";

export default landingPageRoute.createChildRoute(
  "documentation",
  {},
  component(__dirname, () => (
    <>
      <DocumentTitle value="plusnew | documentation" />
      <Async
        pendingIndicator={
          <div>
            <Loader />
          </div>
        }
      >
        {() =>
          // tslint:disable-next-line: space-in-parens
          import(
            /* webpackChunkName: "site/documentation" */ "./components/DocumentationContent"
          )
            .then((module) => <module.default />)
            .catch(() => (
              <i18n.Consumer>
                {({ base }) => <Error message={base()?.error.load || ""} />}
              </i18n.Consumer>
            ))
        }
      </Async>
    </>
  ))
);
