import { createRoute } from '@plusnew/router';
import plusnew, { Async, component } from 'plusnew';
import Error from 'shared/Components/Error';
import Loader from 'shared/Components/Loader';
import DocumentTitle from 'shared/Components/DocumentTitle';

const Container = component(
  __dirname,
  () =>
    <>
      <DocumentTitle value="plusnew | about" />
      <Async
        pendingIndicator={<div><Loader /></div>}
      >{() =>
        // tslint:disable-next-line: space-in-parens
        import(/* webpackChunkName: "site/about" */ './components/AboutContent')
          .then(module => <module.default />)
          .catch(() => <Error message="Could not load" />)
        }</Async>
    </>,
);

export default createRoute(
  ['about'],
  {},
  Container,
);