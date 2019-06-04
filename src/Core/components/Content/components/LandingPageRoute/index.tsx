import { createRoute } from '@plusnew/router';
import plusnew, { Async, component } from 'plusnew';
import Error from 'shared/Components/Error';
import Loader from 'shared/Components/Loader';

const Container = component(
  __dirname,
  () =>
    <Async
      pendingIndicator={<div><Loader /></div>}
    >{() =>
      // tslint:disable-next-line: space-in-parens
      import(/* webpackChunkName: "site/leadPage" */ './components/LandingPageContent')
        .then(module => <module.default />)
        .catch(() => <Error message="Could not load" />)
    }</Async>,
);

export default createRoute(
  ['', 'landingPage'],
  {},
  Container,
);
