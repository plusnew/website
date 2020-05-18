import plusnew, { Async, component } from "@plusnew/core";
import LoadError from "Core/components/util/LoadError";
import DocumentTitle from "shared/Components/DocumentTitle";
import Loader from "shared/Components/Loader";
import landingPageRoute from "../LandingPageRoute";

export default landingPageRoute.createChildRoute(
  "about",
  {},
  component(__dirname, () => (
    <>
      <DocumentTitle value="plusnew | about" />
      <Async
        pendingIndicator={
          <div>
            <Loader />
          </div>
        }
        constructor={() =>
          import(
            /* webpackChunkName: "site/about" */ "./components/AboutContent"
          ).catch(() => ({ default: LoadError }))
        }
      >
        {(module) => <module.default />}
      </Async>
    </>
  ))
);
