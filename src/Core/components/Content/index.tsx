import { Invalid, NotFound } from '@plusnew/router';
import plusnew, { Async, component } from '@plusnew/core';
import DocumentTitle from 'shared/Components/DocumentTitle';
import Error from 'shared/Components/Error/index';
import Loader from 'shared/Components/Loader';
import AboutRoute from './components/AboutRoute';
import DocumentationRoute from './components/DocumentationRoute';
import GuideRoute from './components/GuideRoute';
import LandingPageRoute from './components/LandingPageRoute';
import styles from './content.scss';

export default component(
  __dirname,
  () =>
    <article className={styles.content}>
      <LandingPageRoute.Component />
      <DocumentationRoute.Component />
      <AboutRoute.Component />
      <GuideRoute.Component />
      <NotFound>
        <>
          <DocumentTitle value="plusnew | not found" />
          <Async
            pendingIndicator={<div><Loader /></div>}
          >{() =>
            // tslint:disable-next-line: space-in-parens
            import(/* webpackChunkName: "site/notFound" */ './components/NotFound')
              .then(module => <module.default />)
              .catch(() => <Error message="Could not load" />)
            }</Async>
        </>
      </NotFound>

      <Invalid>
        <>
          <DocumentTitle value="plusnew | invalid url" />
          <Async
            pendingIndicator={<div><Loader /></div>}
          >{() =>
            // tslint:disable-next-line: space-in-parens
            import(/* webpackChunkName: "site/invalid" */ './components/Invalid')
              .then(module => <module.default />)
              .catch(() => <Error message="Could not load" />)
            }</Async>
        </>
      </Invalid>
    </article>,
);
