import plusnew from "@plusnew/core";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import { StaticProvider } from "@plusnew/router";
import { configure } from "enzyme";
import i18n from "shared/Components/i18n";
import Loader from "shared/Components/Loader";
import { getAwaitAllHandle } from "testHelper";
import AboutContent from "./components/AboutRoute/components/AboutContent";
import DocumentationContent from "./components/DocumentationRoute/components/DocumentationContent";
import GuideContent from "./components/GuideRoute/components/GuideContent";
import Invalid from "./components/Invalid";
import LandingPageContent from "./components/LandingPageRoute/components/LandingPageContent";
import NotFound from "./components/NotFound";
import Index from "./index";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("test <Content />", () => {
  it("landing page should be present", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<LandingPageContent />)).toBe(true);

    expect(document.title).toBe("plusnew | the framework for maintanability");
  });

  it("documentation page should be present", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/documentation" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(document.title).toBe("plusnew | documentation");

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<DocumentationContent />)).toBe(
      true
    );

    expect(document.title).toBe("plusnew | documentation");
  });

  it("guide page should be present", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/guide" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(document.title).toBe("plusnew | guide");

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<GuideContent />)).toBe(true);

    expect(document.title).toBe("plusnew | guide");
  });

  it("About page should be present", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/about" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(document.title).toBe("plusnew | about");

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<AboutContent />)).toBe(true);

    expect(document.title).toBe("plusnew | about");
  });

  it("landing page should be present at root", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<LandingPageContent />)).toBe(true);
  });

  it("invalid page should be present, when given weird parameters", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/;invalid=parameter" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(document.title).toBe("plusnew | invalid url");

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<Invalid />)).toBe(true);

    expect(document.title).toBe("plusnew | invalid url");
  });

  it("not found page should be present", async () => {
    const awaitHandle = getAwaitAllHandle();
    const wrapper = mount(
      <StaticProvider url="/mep" onchange={() => null}>
        <Index />
      </StaticProvider>,
      {
        plusnewRenderOptions: {
          addAsyncListener: awaitHandle.callback,
        },
      }
    );

    expect(document.title).toBe("plusnew | not found");

    expect(wrapper.containsMatchingElement(<Loader />)).toBe(true);

    await awaitHandle.done();

    expect(wrapper.containsMatchingElement(<NotFound />)).toBe(true);

    expect(document.title).toBe("plusnew | not found");
  });
});
