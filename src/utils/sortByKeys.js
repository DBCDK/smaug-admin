import _ from 'lodash';

const sortByKeys = (object, asc) => {
  const keys = Object.keys(object);
  const sortedKeys = _.sortBy(keys);

  const res = _.map(sortedKeys, key => [key, object[key]]);

  if (!asc) {
    return _.fromPairs(res.reverse());
  }

  return _.fromPairs(res);
};

export default sortByKeys;
