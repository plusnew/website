import { StaticProvider } from '@plusnew/router';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Loader from 'shared/Components/Loader';
import LandingPageContent from './components/LandingPageRoute/components/LandingPageContent';
import Index from './index';
import { getAwaitAllHandle } from 'test';
import { NOTFOUND } from 'dns';
import NotFound from './components/NotFound';
import Invalid from './components/Invalid';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('test <Content />', () => {
  it('landing page should be present', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="landingPage" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <LandingPageContent />,
    )).toBe(true);
  });

  it('landing page should be present at root', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <LandingPageContent />,
    )).toBe(true);
  });

  it('invalid page should be present, when given weird parameters', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/landingPage?invalid=parameter" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <Invalid />,
    )).toBe(true);
  });

  it('not found page should be present', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/mep" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <NotFound />,
    )).toBe(true);
  });
});
