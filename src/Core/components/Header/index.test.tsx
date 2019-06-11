import DocumentationRoute from 'Core/components/Content/components/DocumentationRoute';
import LandingPageRoute from 'Core/components/Content/components/LandingPageRoute';
import ImpressumRoute from 'Core/components/Content/components/ImpressumRoute';

import { StaticProvider } from '@plusnew/router';
import { configure } from 'enzyme';
import enzymeAdapterPlusnew, { mount } from 'enzyme-adapter-plusnew';
import plusnew from 'plusnew';
import Index from './index';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('test <Header />', () => {
  it('should contain landing page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <LandingPageRoute.Link parameter={{}}>plusnew</LandingPageRoute.Link>,
    )).toBe(true);
  });

  it('should contain documentation page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <DocumentationRoute.Link parameter={{}}>documentation</DocumentationRoute.Link>,
    )).toBe(true);
  });

  it('should contain impressum page', () => {
    const wrapper = mount(<StaticProvider url="" onchange={() => null}><Index /></StaticProvider>);

    expect(wrapper.containsMatchingElement(
      <ImpressumRoute.Link parameter={{}}>impressum</ImpressumRoute.Link>,
    )).toBe(true);
  });
});
