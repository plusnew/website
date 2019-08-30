import { StaticProvider } from '@plusnew/router';
import DocumentationRoute from 'Core/components/Content/components/DocumentationRoute';
import GuideRoute from 'Core/components/Content/components/GuideRoute';
import AboutRoute from 'Core/components/Content/components/AboutRoute';
import LandingPageRoute from 'Core/components/Content/components/LandingPageRoute';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from '@plusnew/enzyme-adapter';
import plusnew from '@plusnew/core';
import Index from './index';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('test <Header />', () => {
  it('should contain landing page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <LandingPageRoute.Link parameter={{}}>+ plusnew</LandingPageRoute.Link>,
    )).toBe(true);
  });

  it('should contain documentation page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <DocumentationRoute.Link parameter={{}}>documentation</DocumentationRoute.Link>,
    )).toBe(true);
  });

  it('should contain Guide page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <GuideRoute.Link parameter={{}}>guide</GuideRoute.Link>,
    )).toBe(true);
  });

  it('should contain about page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <AboutRoute.Link parameter={{}}>about</AboutRoute.Link>,
    )).toBe(true);
  });
});
