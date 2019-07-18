import { createRoute } from '@plusnew/router';
import plusnew, { Async, component } from 'plusnew';
import Error from 'shared/Components/Error';
import Loader from 'shared/Components/Loader';
import DocumentTitle from 'shared/Components/DocumentTitle';

const Container = component(
  __dirname,
  () =>
    <>
      <DocumentTitle value="plusnew | guide" />
      <Async
        pendingIndicator={<div><Loader /></div>}
      >{() =>
        // tslint:disable-next-line: space-in-parens
        import(/* webpackChunkName: "site/guide" */ './components/GuideContent')
          .then(module => <module.default />)
          .catch(() => <Error message="Could not load" />)
        }</Async>
    </>,
);

export default createRoute(
  ['guide'],
  {},
  Container,
);
