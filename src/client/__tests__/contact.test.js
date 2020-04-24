import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import ContactContainer from '../components/contact/contactContainer.component';

describe('<ContactContainer />', () => {
  const wrapper = mount(<ContactContainer/>);
  it('contains an <ContactContainer/> component', function () {
    expect(wrapper.find('.contact')).to.have.length(1);
    expect(wrapper.find('.contact-row')).to.have.length(1);
  });

  it('add/remove contact row', function () {
    wrapper.find('.add a').simulate('click');
    expect(wrapper.find('.contact-row')).to.have.length(2);
    wrapper.find('.remove a').simulate('click');
    expect(wrapper.find('.contact-row')).to.have.length(1);
  });

  it('parses contacts', function () {
    const contacts = {
      owner: {name: 'owner'},
      test: {name: 'test'}
    };
    const component = mount(<ContactContainer contacts={contacts}/>);
    expect(component.find('.contact-row')).to.have.length(2);
    expect(component.parseContacts).to.be.function;
    expect(component.instance().parseContacts(contacts)).to.be.deep.equal([
      {role: 'owner', contact: {name: 'owner'}},
      {role: 'test', contact: {name: 'test'}}
    ]);
  });
})
;
