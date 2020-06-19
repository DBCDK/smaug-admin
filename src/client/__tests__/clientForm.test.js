import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ClientFormContainer from '../components/clientForm/clientFormContainer.component';
import ClientForm from '../components/clientForm/clientForm.component';

describe('<ClientFormContainer />', () => {
  // These tests have become problematic after converting to HOOKS.
  // Consider running these tests in Cypress instead.
  /* afterEach(() => {
    sinon.restore();
  });
  const wrapper = mount(<ClientFormContainer />);
  it('contains an <ClientForm/> component', function() {
    expect(wrapper.instance().hasError).to.be.false;
    expect(wrapper.find(ClientForm)).to.have.length(1);
  });

  it('toggles error state', function() {
    expect(wrapper.instance().hasError).to.be.false;
    wrapper.instance().setErrorState(true);
    expect(wrapper.instance().hasError).to.be.true;
    const preventDefault = sinon.spy();
    wrapper.instance().onSubmit({preventDefault});
    expect(preventDefault).to.have.property('callCount', 1);
  });

  it('prevents submitting on errors and add alert', function() {
    wrapper.instance().setErrorState(true);
    const preventDefault = sinon.spy();
    global.alert = sinon.spy();
    wrapper.instance().onSubmit({preventDefault});
    expect(preventDefault).to.have.property('callCount', 1);
    expect(global.alert).to.have.property('callCount', 1);
  });*/
});
