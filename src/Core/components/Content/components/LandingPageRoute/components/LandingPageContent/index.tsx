import plusnew, { component } from "@plusnew/core";
import i18n from "shared/Components/i18n";
import Loader from "shared/Components/Loader";

export default component(__dirname, () => (
  <i18n.Consumer>
    {({ base }) => <div>{base()?.content.description || <Loader />}</div>}
  </i18n.Consumer>
));
