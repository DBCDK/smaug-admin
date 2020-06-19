import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';

import LoginFormContainer from '../components/loginForm/loginFormContainer.component';

describe('<LoginFormContainer />', () => {
  const wrapper = mount(<LoginFormContainer />);
  it('contains an <LoginFormContainer/> component', function() {
    expect(wrapper.find('.loginform')).to.have.length(1);
  });
});
