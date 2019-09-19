'use strict';

$(document).ready(function() {
    bookmarkList.render();
    api.getBookmarks()
    .then(response => response.json())
    .then((bookmarks) => {
        bookmarks.forEach((bookmark) => dataOps.addBookmark(bookmark));
        bookmarkList.renderAllElements(bookmarks);
    });
    bookmarkList.bindEventListeners();
});