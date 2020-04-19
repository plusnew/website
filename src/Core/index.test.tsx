import enzymeAdapterPlusnew, { mount } from "@plusnew/enzyme-adapter";
import { configure } from "enzyme";
import plusnew from "@plusnew/core";
import Index from "./index";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

configure({ adapter: new enzymeAdapterPlusnew() });

describe("test <Core />", () => {
  it("header should be present", () => {
    const wrapper = mount(<Index />);

    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });

  it("content should be present", () => {
    const wrapper = mount(<Index />);

    expect(wrapper.containsMatchingElement(<Content />)).toBe(true);
  });

  it("footer should be present", () => {
    const wrapper = mount(<Index />);

    expect(wrapper.containsMatchingElement(<Footer />)).toBe(true);
  });
});
