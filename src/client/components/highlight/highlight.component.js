import React from 'react';

const Highlight = ({children, highlight}) => {
  if (!highlight) {
    return <div className="highlight">{children}</div>
  }
  const regexp = new RegExp(highlight, 'gi');
  const matches = children.match(regexp);
  var parts = children.split(new RegExp(`${highlight.replace()}`, 'gi'));

  for (var i = 0; i < parts.length; i++) {
    if (i !== parts.length - 1) {
      let match = matches[i];
      parts[i] = (
        <React.Fragment key={i}>
          {parts[i]}<span className="highlighted">{match}</span>
        </React.Fragment>
      );
    }
  }
  return <div className="highlight">{parts}</div>;
};

export default Highlight;
