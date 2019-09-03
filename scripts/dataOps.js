'use strict';

const dataOps = (function () {

  let addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  let findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  let findAndUpdate = function (id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  let findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  let toggleExpand = function (item) {
    item.expanded = !item.expanded;
  };

//   let setRatingFilter = function () {

//   };

  let setBookmarkEditing = function () {

  };

  return {
    bookmarks:[],
    expanded:false,
    addBookmark,
    findAndDelete,
    findAndUpdate,
    findById,
    toggleExpand,
  };


})();