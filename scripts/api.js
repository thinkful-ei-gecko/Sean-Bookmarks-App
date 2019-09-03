'use strict';

const api = (function () {

  const BASE_URL = ('https://thinkful-list-api.herokuapp.com/seankc/bookmarks/');

  let getBookmarks = function() {
    console.log(BASE_URL);
    return(fetch(BASE_URL));
  };

  let createBookmark = function(title, url, desc = '', rating='') {
    let newBookmark = {
      'title': title,
      'url' : url,
      'desc': desc,
      'rating':rating,
      'expanded':false,
    };
    return(fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers ({
        'Content-Type':'application/json'
      }),
      body: JSON.stringify(newBookmark)
    }));
  };

  let updateBookmark = function(id, updatedInfo) {
    let newlyFormattedEdit = JSON.stringify(updatedInfo);
    return (fetch(BASE_URL + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: newlyFormattedEdit
    }));
  };

  let deleteBookmark = function (id) {
    return (fetch(BASE_URL + id, {
        method:'DELETE',
        body: JSON.stringify(id)
    }));
  };

  return {
    getBookmarks:getBookmarks,
    createBookmark:createBookmark,
    updateBookmark:updateBookmark,
    deleteBookmark:deleteBookmark,
  };
})(); 