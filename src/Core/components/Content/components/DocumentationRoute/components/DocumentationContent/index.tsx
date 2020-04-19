import plusnew, { component } from "@plusnew/core";
import i18n from "shared/Components/i18n";
import Loader from "shared/Components/Loader";
import MonacoEditor from "shared/Components/MonacoEditor";

export default component(__dirname, () => (
  <>
    <i18n.Consumer>
      {({ documentation }) => (
        <div>{documentation()?.description || <Loader />}</div>
      )}
    </i18n.Consumer>
    <MonacoEditor value="const foo: string = 'hello';" />
  </>
));
