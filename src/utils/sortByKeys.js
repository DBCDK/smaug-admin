import _ from 'lodash';

const sortByKeys = object => {
  const keys = Object.keys(object);
  const sortedKeys = _.sortBy(keys);

  return _.fromPairs(_.map(sortedKeys, key => [key, object[key]]));
};

export default sortByKeys;
