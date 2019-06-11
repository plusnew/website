import plusnew, { component } from 'plusnew';
import DocumentationRoute from 'Core/components/Content/components/DocumentationRoute';
import LandingPageRoute from 'Core/components/Content/components/LandingPageRoute';
import ImpressumRoute from 'Core/components/Content/components/ImpressumRoute';

export default component(
  __dirname,
  () =>
    <ul>
      <li><LandingPageRoute.Link parameter={{}}>plusnew</LandingPageRoute.Link></li>
      <li><DocumentationRoute.Link parameter={{}}>documentation</DocumentationRoute.Link></li>
      <li><ImpressumRoute.Link parameter={{}}>impressum</ImpressumRoute.Link></li>
    </ul>,
);
