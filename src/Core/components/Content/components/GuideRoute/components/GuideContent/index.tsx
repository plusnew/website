import plusnew, { component } from "@plusnew/core";
import i18n from "shared/Components/i18n";

export default component(__dirname, () => (
  <i18n.Consumer>
    {({ guides }) => <div>{guides()?.description}</div>}
  </i18n.Consumer>
));
