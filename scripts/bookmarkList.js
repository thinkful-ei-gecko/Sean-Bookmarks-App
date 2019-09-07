'use strict';

// const STORE = {};

// const bookmarkList = [];

const bookmarkList = (function () {

  let renderForm = function() {
    $('form').on('click', '#addButton', function(event){
      event.preventDefault();  
      $('form').html(`<div class = "formInput">
                <p id= "titleText">Title: </p>
                <input type="text" name="title" id="title" class = "movieTitle" required /><br>
                <p id= "urlLabel"> URL: </p>
                <input type="text" name="url" id ="url" required />
                <section class = "movieRating">
                    <p id= "ratingText">Rating: </p>
                      <div id= "radioBox">
                      <input type="radio" id="rating5" class="rating" name="rating" value="5"><label for "rating5">5</label>
                      <input type="radio" id="rating4" class="rating" name="rating" value="4"><label for "rating5">4</label>
                      <input type="radio" id="r
                      ating3" class="rating" name="rating" value="3"><label for "rating5">3</label>
                      <input type="radio" id="rating2" class="rating" name="rating" value="2"><label for "rating5">2</label>
                      <input type="radio" id="rating1" class="rating" name="rating" value="1"><label for "rating5">1</label>
                    </div>
                </section>
                <p> Description: </p>
                <input type= "text" name = "desc" id="desc" class ="description">
                <section class = "submitArea">
                    <input type= "submit" class="uploadButton" value="Upload Movie">
                    <input type= "button" class="cancel" value="Cancel">
                </section>
                </div>`);
    });
  };

  
  let renderBookmarkElement = function(bookmark) {
      console.log(bookmark);
        return `<div class = "outputContainer" data-item-id="${bookmark.id}">
                <div class = "textArea">
                <p id="movieTitleStyle"> Title: ${bookmark.title} </p>
                <p> URL: <p> <a href = "${bookmark.url}">${bookmark.url}</a>
                </div>
                <div class = "buttonArea">
                <button type = "button" id = 'expandButton'> - </button>
                <button type = "button" id = 'removeButton'> Remove </button>
            </div>
           </div>`;  
  };

  //<button type = "button" id = 'editButton'> Edit </button>

  let renderBookmarkElementExpanded = function(item) {
    console.log(item.expanded);
    if (item.expanded === true) {
    return `<div class = "outputContainer" data-item-id="${item.id}">
    <div class = "textArea">
        <p id="movieTitleStyle"> Title: ${item.title} </p>
        <p> URL: <p> <a href = "${item.url}">${item.url}</a>
        <p> Rating: ${item.rating} </p>
        <p> Description : ${item.desc} </p>
        </div>
    <div class = "buttonArea">
        <button type = "button" id = 'expandButton'> - </button>
        <button type = "button" id = 'removeButton'> Remove </button>
        <button type = "button" id = 'editButton'> Edit </button>
    </div>
    </div>`; }
else
    return `<div class = "outputContainer" data-item-id="${item.id}">
    <div class = "textArea">
    <p id="movieTitleStyle"> Title: ${item.title} </p>
    <p> URL: <p> <a href = "${item.url}">${item.url}</a>
    </div>
    <div class = "buttonArea">
    <button type = "button" id = 'expandButton'> - </button>
    <button type = "button" id = 'removeButton'> Remove </button>
</div>
</div>`;
  };

  let generateBookmarkListString = function (bookmarkList) {
    const bookmarkString = bookmarkList.map((bookmark) => renderBookmarkElement(bookmark));
    return bookmarkString.join('');
  };

  let generateBookmarkListStringExpanded = function (bookmarkList) {
    const bookmarkString = bookmarkList.map((bookmark) => renderBookmarkElementExpanded(bookmark));
    return bookmarkString.join('');
  };

  let renderAllElements = function () {
    let bmarks = [...dataOps.bookmarks];
    const bmarksString = generateBookmarkListString(bmarks);
    $('.bookmarkList').html(bmarksString);
  };

  let renderAllElementsExpanded = function () {
    let bmarks = [...dataOps.bookmarks];
    const bmarksString = generateBookmarkListStringExpanded(bmarks);
    $('.bookmarkList').html(bmarksString);
  };

  let renderSomeElements = function () {
    let items = [...dataOps.bookmarks ];
    items = items.filter(item => item.rating >= $('option:selected').val());
    const bmarksString = generateBookmarkListString(items);
    $('.bookmarkList').html(bmarksString);
  }

  let render = function () {
    $('.formInsert').html(`<form name = "userChoice" id= "userChoice">
        <p> Are You Ready to Add Your Favorite Movie Bookmarks?</p>
        <div class = "addButtonArea">
            <button type = "button" id ="addButton"> Add </button>
        </div>
            <div class= "selectionBox">
            <p> .. or Maybe You'd Like to View By Minimum Rating?</p>
            <select class = "viewByRating">              
                <option value = "5"> 5 </option>
                <option value = "4"> 4 </option>
                <option value = "3"> 3 </option>
                <option value = "2"> 2 </option>
                <option value = "1"> 1 </option>                
            </select>
        </div>
        <div class = "inputArea"></div>
    </form>`);
    renderForm();
  };

  let handleNewBookmarkSubmit = function () {
    $('form').submit(function (event) {
      event.preventDefault();
      const newTitle = $('#title').val();
      const newURL = $('input#url').val();
      const newDesc = $('#desc').val();
      const newRating = $('input[name="rating"]:checked').val();           
      console.log (newTitle + newURL +  newDesc + newRating);
      api.createBookmark(newTitle, newURL, newDesc, newRating)
        .then(response => response.json())
        .then((newBookmark) => {
          dataOps.addBookmark(newBookmark); 
          renderBookmarkElement(newBookmark);
          renderAllElements();
          render();
        });
    });
  };


  let getBookmarkIdFormElement = function(bookmark) {
    return $(bookmark)
     .closest('.outputContainer')
     .data('item-id');
  };

  let handleExpandBookmark = function () {
    $('.bookmarkList').on('click', '#expandButton', event => {
        event.preventDefault();
        const id = getBookmarkIdFormElement(event.currentTarget);
        const item =dataOps.findById(id);
        dataOps.toggleExpand(item);
        renderBookmarkElementExpanded(item);
        renderAllElementsExpanded();
    });
  };

  let handleDeleteBookmark = function () {
    $('.bookmarkList').on('click', '#removeButton', event => {
        event.preventDefault();
        const id = getBookmarkIdFormElement(event.currentTarget);
        console.log(id);
        api.deleteBookmark(id)
        .then(() => {
            dataOps.findAndDelete(id);
            renderAllElements();
        });
    });
  };

  let handleUpdateBookmark = function () {

  };

  let handleRatingFilter = function () {
    $('form').on('click', '.viewByRating', (function(event) {
        console.log("I have been clicked");
        event.preventDefault();
        renderSomeElements();
    }));
  };

  let handleItemEditing = function () {
    $('bookmarkList').on('click', '#editButton', (function(event){
        event.preventDefault();
    }));
  };

  let handleCancel = function () {
    $('form').on('click', '.cancel', (function(event) {
      event.preventDefault(); 
      render();
    }));
  };

  let bindEventListeners = function () {
    handleNewBookmarkSubmit();
    handleExpandBookmark();
    handleDeleteBookmark();
    handleUpdateBookmark();
    handleRatingFilter();
    handleItemEditing();
    handleCancel();
  };

  return {
    bindEventListeners:bindEventListeners,
    render:render,
    renderForm:renderForm,
    renderAllElements:renderAllElements,
    renderAllElementsExpanded:renderAllElementsExpanded,
    renderBookmarkElement:renderBookmarkElement,
    renderBookmarkElementExpanded:renderBookmarkElementExpanded,
    renderSomeElements:renderSomeElements,
  };

})();