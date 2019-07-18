import { StaticProvider } from '@plusnew/router';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Loader from 'shared/Components/Loader';
import LandingPageContent from './components/LandingPageRoute/components/LandingPageContent';
import DocumentationContent from './components/DocumentationRoute/components/DocumentationContent';
import GuideContent from './components/GuideRoute/components/GuideContent';
import AboutContent from './components/AboutRoute/components/AboutContent';
import Index from './index';
import { getAwaitAllHandle } from 'test';
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

    expect(document.title).toBe('plusnew | the framework for maintanability');
  });

  it('documentation page should be present', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="documentation" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(document.title).toBe('plusnew | documentation');

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <DocumentationContent />,
    )).toBe(true);

    expect(document.title).toBe('plusnew | documentation');
  });


  it('guide page should be present', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="guide" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(document.title).toBe('plusnew | guide');

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <GuideContent />,
    )).toBe(true);

    expect(document.title).toBe('plusnew | guide');
  });

  it('About page should be present', async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="about" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      },
    );

    expect(document.title).toBe('plusnew | about');

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <AboutContent />,
    )).toBe(true);

    expect(document.title).toBe('plusnew | about');
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

    expect(document.title).toBe('plusnew | invalid url');

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <Invalid />,
    )).toBe(true);

    expect(document.title).toBe('plusnew | invalid url');
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

    expect(document.title).toBe('plusnew | not found');

    expect(wrapper.containsMatchingElement(
      <Loader />,
    )).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(
      <NotFound />,
    )).toBe(true);

    expect(document.title).toBe('plusnew | not found');
  });
});
