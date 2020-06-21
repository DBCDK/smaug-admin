import React from 'react';

const Highlight = ({children, highlight}) => {
  const highlightRegExp = highlight.replace(/\.|\+|\[|\(|\)|\*|\?|\^|\$/gi, x => '\\' + x);
  if (!highlightRegExp) {
    return <div className="highlight">{children}</div>;
  }
  const matches = children.match(new RegExp(highlightRegExp, 'gi'));
  var parts = children.split(new RegExp(`${highlightRegExp.replace()}`, 'gi'));

  for (var i = 0; i < parts.length; i++) {
    if (i !== parts.length - 1) {
      let match = matches[i];
      parts[i] = (
        <React.Fragment key={i}>
          {parts[i]}
          <span className="highlighted">{match}</span>
        </React.Fragment>
      );
    }
  }
  return <div className="highlight">{parts}</div>;
};

export default Highlight;
