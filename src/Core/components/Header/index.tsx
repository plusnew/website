import plusnew, { component } from '@plusnew/core';
import DocumentationRoute from 'Core/components/Content/components/DocumentationRoute';
import GuideRoute from 'Core/components/Content/components/GuideRoute';
import LandingPageRoute from 'Core/components/Content/components/LandingPageRoute';
import AboutRoute from 'Core/components/Content/components/AboutRoute';
import styles from './header.scss';
import github from './github.png';

export default component(__dirname, () => (
  <header class={styles.header}>
    <h1>
      <LandingPageRoute.Link
        parameter={{
          '/': {}
        }}
      >
        + plusnew
      </LandingPageRoute.Link>
    </h1>
    <nav>
      <DocumentationRoute.Link
        parameter={{
          '/': {},
          documentation: {}
        }}
      >
        documentation
      </DocumentationRoute.Link>
      <GuideRoute.Link
        parameter={{
          '/': {},
          guide: {}
        }}
      >
        guide
      </GuideRoute.Link>
      <AboutRoute.Link
        parameter={{
          '/': {},
          about: {}
        }}
      >
        about
      </AboutRoute.Link>
    </nav>
    <div class={styles.external}>
      <a href="https://github.com/plusnew/plusnew" target="_blank">
        <img src={github} />
      </a>
    </div>
  </header>
));
