import plusnew, { component, Async } from 'plusnew';
import leadPageContainer from './components/LeadPageContainer';
import { NotFound, Invalid } from '@plusnew/router';
import Error from 'shared/Components/Error';
import Loader from 'shared/Components/Loader';

export default component(
  __dirname,
  () =>
    <>
      <leadPageContainer.Component />
      <NotFound>
        <Async
          pendingIndicator={<div><Loader /></div>}
        >{() =>
          // tslint:disable-next-line: space-in-parens
          import(/* webpackChunkName: "site/notFound" */ './components/NotFound')
            .then(module => <module.default />)
            .catch(() => <Error message="Could not load" />)
          }</Async>
      </NotFound>

      <Invalid>
        <Async
          pendingIndicator={<div><Loader /></div>}
        >{() =>
          // tslint:disable-next-line: space-in-parens
          import(/* webpackChunkName: "site/invalid" */ './components/Invalid')
            .then(module => <module.default />)
            .catch(() => <Error message="Could not load" />)
          }</Async>
      </Invalid>
    </>,
);
