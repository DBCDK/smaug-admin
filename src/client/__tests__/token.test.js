import React from 'react';
import {mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import request from 'superagent';

import TokenContainer, {TokenView} from '../components/token/tokenContainer.component';

const client = {id: 'test', name: 'testName'};
const token = {id: 'tokenId', expires: '12-02-2016'};

describe('<TokenContainer />', () => {
  const wrapper = mount(<TokenContainer client={client}/>);
  it('contains an <TokenForm/> component', function () {
    expect(wrapper.find('.tokenform')).to.have.length(1);
  });

  it('shows new token in overlay', function () {
    const mockRequest = sinon.mock(request);
    mockRequest.get = () => {
      return {
        end: (cb) => {
          cb(null, {ok: true, text: JSON.stringify(token)});
        }
      };
    };

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
  });

  it('renders TokenView with id and expires', function () {
    const component = render(<TokenView client={client} token={token} />);
    expect(component.text()).to.contain('testName');
    expect(component.text()).to.contain('tokenId');
    expect(component.text()).to.contain('Friday, Dec 2, 2016');
  });
})
;
