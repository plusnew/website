import plusnew, { component } from "@plusnew/core";
import MonacoEditor from "shared/Components/MonacoEditor";
import i18n from "shared/Components/i18n";

export default component(__dirname, () => (
  <>
    <i18n.Consumer>
      {({ documentation }) => <div>{documentation()?.description}</div>}
    </i18n.Consumer>
    <MonacoEditor value="const foo: string = 'hello';" />
  </>
));
