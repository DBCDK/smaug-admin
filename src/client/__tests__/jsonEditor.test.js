import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import JEditor from '../components/jsonEditor/jsonEditor.component';

describe('<JEditor />', () => {

  it('contains an <JEditor/> component', function () {
    const wrapper = mount(<JEditor name="config" />);
    expect(wrapper.find('input[name="config"]')).to.have.length(1);
  });

  it('returns error when faulty json', function () {
    const callback = sinon.spy();
    const wrapper = mount(<JEditor name="config" setErrorState={callback}/>);
    const editor = wrapper.instance().editor;

    // editor method is mocked to provide fake json
    editor.getText = () => '{invalid json}';

    // activate change listener
    wrapper.instance().editor._onChange();

    expect(wrapper.state().json).to.be.equal('{invalid json}');

    expect(callback.getCall(0).args[0]).to.be.true;
  });

  it('returns no error when valid json', function () {
    const callback = sinon.spy();
    const wrapper = mount(<JEditor name="config" setErrorState={callback}/>);
    const editor = wrapper.instance().editor;
    editor.getText = () => '{"json": "valid"}';
    wrapper.instance().editor._onChange();
    expect(wrapper.state().json).to.be.equal('{"json": "valid"}');

    // Callback is called with
    expect(callback.getCall(0).args[0]).to.be.false;
  });
});
