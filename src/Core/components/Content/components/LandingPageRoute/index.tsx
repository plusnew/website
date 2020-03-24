import plusnew, { Async, component } from '@plusnew/core';
import { createRoute } from '@plusnew/router';
import DocumentTitle from 'shared/Components/DocumentTitle';
import Error from 'shared/Components/Error';
import Loader from 'shared/Components/Loader';

export default createRoute(
  '/',
  {},
  component(
    __dirname,
    () =>
      <>
        <DocumentTitle value="plusnew | the framework for maintanability" />
        <Async
          pendingIndicator={<div><Loader /></div>}
        >{() =>
          // tslint:disable-next-line: space-in-parens
          import(/* webpackChunkName: "site/leadPage" */ './components/LandingPageContent')
            .then(module => <module.default />)
            .catch(() => <Error message="Could not load" />)
          }</Async>
      </>,
  ),
);
