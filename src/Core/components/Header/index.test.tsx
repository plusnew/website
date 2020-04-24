import { StaticProvider } from "@plusnew/router";
import DocumentationRoute from "Core/components/Content/components/DocumentationRoute";
import GuideRoute from "Core/components/Content/components/GuideRoute";
import AboutRoute from "Core/components/Content/components/AboutRoute";
import LandingPageRoute from "Core/components/Content/components/LandingPageRoute";
import { configure } from "enzyme";
import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import plusnew from "@plusnew/core";
import Index from "./index";
import i18n from "shared/Components/i18n";

configure({ adapter: new enzymeAdapterPlusnew() });

async function tick(amount: number) {
  for (let i = 0; i < amount; i += 1) {
    await new Promise((resolve) => resolve());
  }
}
describe("test <Header />", () => {
  xit("should contain landing page", () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>
    );

    expect(
      wrapper.containsMatchingElement(
        <LandingPageRoute.Link parameter={{ "/": {} }}>
          + plusnew
        </LandingPageRoute.Link>
      )
    ).toBe(true);
  });

  it("should contain documentation page", async () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>
    );

    await tick(2);

    expect(
      wrapper.containsMatchingElement(
        <DocumentationRoute.Link
          parameter={{
            "/": {},
            documentation: {},
          }}
        >
          Documentation
        </DocumentationRoute.Link>
      )
    ).toBe(true);
  });

  it("should contain Guide page", async () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>
    );

    await tick(2);

    const result = wrapper.containsMatchingElement(
      <GuideRoute.Link
        parameter={{
          "/": {},
          guide: {},
        }}
      >
        Guide
      </GuideRoute.Link>
    );

    expect(result).toBe(true);
  });

  it("should contain about page", async () => {
    const wrapper = mount(
      <StaticProvider url="" onchange={() => null}>
        <i18n.Provider language="en">
          <Index />
        </i18n.Provider>
      </StaticProvider>
    );

    await tick(2);

    expect(
      wrapper.containsMatchingElement(
        <AboutRoute.Link parameter={{ "/": {}, about: {} }}>
          About
        </AboutRoute.Link>
      )
    ).toBe(true);
  });
});
