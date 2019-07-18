import plusnew, { component } from 'plusnew';
import DocumentationRoute from 'Core/components/Content/components/DocumentationRoute';
import LandingPageRoute from 'Core/components/Content/components/LandingPageRoute';
import AboutRoute from 'Core/components/Content/components/AboutRoute';
import styles from './header.scss';

export default component(
  __dirname,
  () =>
    <header className={styles.header}>
      <ul>
        <li><LandingPageRoute.Link parameter={{}}>plusnew</LandingPageRoute.Link></li>
        <li><DocumentationRoute.Link parameter={{}}>documentation</DocumentationRoute.Link></li>
        <li><AboutRoute.Link parameter={{}}>about</AboutRoute.Link></li>
      </ul>
    </header>
);
