import plusnew, { Async, component } from "@plusnew/core";
import { createRoute } from "@plusnew/router";
import LoadError from "Core/components/util/LoadError";
import DocumentTitle from "shared/Components/DocumentTitle";
import Loader from "shared/Components/Loader";

export default createRoute(
  "/",
  {},
  component(__dirname, () => (
    <>
      <DocumentTitle value="plusnew | the framework for maintanability" />
      <Async
        pendingIndicator={
          <div>
            <Loader />
          </div>
        }
        constructor={() =>
          import(
            /* webpackChunkName: "site/landingPage" */ "./components/LandingPageContent"
          ).catch(() => ({ default: LoadError }))
        }
      >
        {(module) => <module.default />}
      </Async>
    </>
  ))
);
