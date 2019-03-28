'use strict';

module.exports = {
  // looks for a match between list against an object
  // returns true if
  // it finds a property in an object that returns truthy
  compare: (list, object) => {
    return list.some(item => object[`${item}`]);
  }
};
