import React from 'react';
import {mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import request from 'superagent';

import TokenContainer, {
  TokenView,
  expiresDate
} from '../components/token/tokenContainer.component';

const client = {id: 'test', name: 'testName'};
const token = {access_token: 'tokenId', expires_in: 3600};

describe('<TokenContainer />', () => {
  const wrapper = mount(<TokenContainer client={client} />);
  it('contains an <TokenForm/> component', function() {
    expect(wrapper.find('.tokenform')).to.have.length(1);
  });

  it('shows new token in overlay', function() {
    const stub = sinon.stub(request, 'get', () => {
      return {
        end: cb => {
          cb(null, {ok: true, text: JSON.stringify(token)});
        }
      };
    });

    // Fetch token
    wrapper.find('.tokenform a').simulate('click');
    expect(wrapper.find('.tokenform')).to.have.length(0);
    expect(wrapper.find('.tokenview')).to.have.length(1);
    expect(wrapper.state().token).to.deep.equal(token);

    // Close overlay again
    wrapper.find('.background').simulate('click');
    expect(wrapper.find('.tokenform')).to.have.length(1);
    expect(wrapper.find('.tokenview')).to.have.length(0);

    // Open again and retrieve same token
    wrapper.find('.tokenform a').simulate('click');
    expect(wrapper.find('.tokenform')).to.have.length(0);
    expect(wrapper.find('.tokenview')).to.have.length(1);
    stub.restore();
  });

  it('renders TokenView with id and expires', function() {
    const component = render(<TokenView client={client} token={token} />);
    expect(component.text()).to.contain('testName');
    expect(component.text()).to.contain('tokenId');
    const date = expiresDate(token.expires_in);
    expect(component.text()).to.contain(date);
  });
});
