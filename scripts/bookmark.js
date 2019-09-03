'use strict';

/* global cuid */


const bookmark = (function() {

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank!');
  };

  const validateURL = function(url) {
    if (!url) throw new TypeError('URL must not be blank!');
  };

  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,
      expanded: false, 
    };
  };

  return {
    validateName,
    validateURL,
    create,
  };

}());