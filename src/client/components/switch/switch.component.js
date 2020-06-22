import React from 'react';

export default ({name, onChange, checked, ...props}) => {
  return (
    <label className="switch" data-cy={props['data-cy']}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="slider round"></span>
    </label>
  );
};
