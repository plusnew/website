import plusnew, { component, Props } from "@plusnew/core";
import { ElementLifecycle } from "@plusnew/driver-dom";
import * as monaco from "monaco-editor";

type props = {
  value: string;
};
export default component(__dirname, (Props: Props<props>) => (
  <ElementLifecycle
    elementDidMount={(element) => {
      monaco.editor.create(element as HTMLElement, {
        value: Props.getState().value,
        language: "typescript",
        lineNumbers: "off",
        minimap: {
          enabled: false,
        },
      });
    }}
  >
    <div style={{ height: "100%", position: "relative" }} />
  </ElementLifecycle>
));
