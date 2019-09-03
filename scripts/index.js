'use strict';

$(document).ready(function() {
    bookmarkList.render();
    bookmarkList.bindEventListeners();
    api.getBookmarks()
    .then(response => response.json())
    .then((bookmarks) => {
        bookmarks.forEach((bookmark) => dataOps.addBookmark(bookmark));
        bookmarkList.renderAllElements(bookmarks);
    });
});