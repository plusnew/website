import plusnew, { component } from "@plusnew/core";
import MonacoEditor from "shared/Components/MonacoEditor";

export default component(__dirname, () => (
  <>
    <div>Welcome to plusnew docs</div>
    <MonacoEditor value="const foo: string = 'hello';" />
  </>
));
