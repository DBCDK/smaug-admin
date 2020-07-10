import React from 'react';
import Autosuggest from 'react-autosuggest';
import superagent from 'superagent';
import {uniqBy} from 'lodash';

function createLabelsList(list) {
  const labels = list
    .map(c => c.config.label && {name: c.config.label})
    .filter(l => l);

  return uniqBy(labels, function(e) {
    return e.name;
  });
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, pool) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : pool.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => {
  return <div>{suggestion.name}</div>;
};

export default class AutoSuggester extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      list: [],
      labels: [],
      value: props.value || '',
      suggestions: []
    };
  }

  componentDidMount() {
    superagent.get('/api/clients').then(res => {
      const labels = createLabelsList(res.body);
      this.setState({list: res.body || [], labels: labels || []});
    });
  }

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
    const labels = this.state.labels;
    this.setState({
      suggestions: getSuggestions(value, labels)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, {suggestion, suggestionValue}) => {
    // {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
    e.preventDefault();

    this.setState({
      value: suggestionValue
    });
  };

  render() {
    const {list, labels, value, suggestions} = this.state;

    // console.log('labels', labels);

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Set label',
      value,
      onChange: (e, extra) => {
        this.onChange(e, extra);
        this.props.onChange(e, extra);
      },
      'data-cy': 'label-suggester'
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion={false}
        inputProps={inputProps}
      />
    );
  }
}
