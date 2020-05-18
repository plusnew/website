import plusnew, { component, Props } from "@plusnew/core";
import i18n from "shared/Components/i18n";
import Error from "shared/Components/Error";

export default component(__dirname, (Props: Props<{}>) => (
  <i18n.Consumer>
    {({ base }) => <Error message={base()?.error.load || ""} />}
  </i18n.Consumer>
));
