'use strict';

const bookmarkList = (function () {

  let renderForm = function() {
    //$('form').off();
    //$('form').off('click', '.uploadButton');
    //$('form').on('click', '.uploadButton');
    $(document.body).on('click', '#addButton', function(event){
      event.preventDefault();
      $('form').html(`<div class = "formInput">
                <p id= "titleText">Title: </p>
                <input type="text" name="title" id="title" class = "movieTitle" required/><br>
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
                    <button type= "button" class="uploadButton" value="Upload Movie">Upload Movie</button>
                    <button type= "button" class="cancel" value="Cancel">Cancel</button>
                </section>
                </div>`);
    });
    //handleNewBookmarkSubmit();

  };

  
  let renderBookmarkElement = function(bookmark) {
        let newRating = "";
        for (let i=0; i < bookmark.rating; i++) {
            newRating = newRating + '&#10038';
        }
        return `<div class = "outputContainer" data-item-id="${bookmark.id}">
                <div class = "textArea">
                <p id="movieTitleStyle"> Title: ${bookmark.title} </p>
                <p> Rating: <span id="ratingStyle"> ${newRating} </span> </p>
                </div>
                <div class = "buttonArea">
                <button type = "button" id = 'expandButton'> - </button>
                <button type = "button" id = 'removeButton'> Remove </button>
            </div>
           </div>`;  
  };

  let renderBookmarkElementExpanded = function(item) {
    let newRating = "";
    for (let i=0; i < item.rating; i++) {
        newRating = newRating + '&#10038';
    }
    if (item.expanded === true) {
    return `<div class = "outputContainer" data-item-id="${item.id}">
    <div class = "textArea">
        <p id="movieTitleStyle"> Title: ${item.title} </p>
        <p> Rating: <span id="ratingStyle">${newRating}</span> </p>
        <p> URL: <p> <a href = "${item.url}" target="_blank">${item.url}</a>
        <p> Description : ${item.desc} </p>
        </div>
    <div class = "buttonArea">
        <button type = "button" id = 'expandButton'> - </button>
        <button type = "button" id = 'removeButton'> Remove </button>
    </div>
    </div>`; }
else
    return `<div class = "outputContainer" data-item-id="${item.id}">
    <div class = "textArea">
    <p id="movieTitleStyle"> Title: ${item.title} </p>
    <p> Rating: <span id="ratingStyle">${newRating} </span></p>
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
    //bookmarkList.bindEventListeners();
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
                <option value = "0"> None Given </option>                
            </select>
        </div>
        <div class = "inputArea"></div>
    </form>`);
    renderForm();
  };

  let handleNewBookmarkSubmit = function () {
    $(document.body).on('click', '.uploadButton', function (event) {
      if ($('#title').val()===(null||'')){
        alert("Please Enter a Movie Title");
      }
      event.preventDefault();
      console.log("I have been clicked - New Bookmark!");
      const newTitle = $('#title').val();
      const newURL = $('input#url').val();
      let urlVerification = newURL.slice(0,4);
      let newDesc = 'Not Entered';
      let newRating;
      newDesc = $('#desc').val();
      newRating = $('input[name="rating"]:checked').val();       
      if (urlVerification !== 'http') {
        alert ("Not a valid URL");
        render();
      }
      else
      api.createBookmark(newTitle, newURL, newDesc, newRating)
        .then(response => response.json())
        .then((newBookmark) => {
          dataOps.addBookmark(newBookmark); 
          renderAllElements();
          render();
          //bookmarkList.bindEventListeners();      
        });
        //$('form').off('click', '.uploadButton');
    });
    //bookmarkList.bindEventListeners();
  };


  let getBookmarkIdFormElement = function(bookmark) {
    return $(bookmark)
     .closest('.outputContainer')
     .data('item-id');
  };

  let handleExpandBookmark = function () {
    $('.bookmarkList').on('click', '#expandButton', event => {
        console.log("I have been clicked - expand")
        event.preventDefault();
        const id = getBookmarkIdFormElement(event.currentTarget);
        const item = dataOps.findById(id);
        console.log(item);
        dataOps.toggleExpand(item);
        renderAllElementsExpanded();
        renderBookmarkElementExpanded(item);
    });
  };

  let handleDeleteBookmark = function () {
    $('.bookmarkList').on('click', '#removeButton', event => {
      console.log("I have been clicked - remove bookmark");
        event.preventDefault();
        const id = getBookmarkIdFormElement(event.currentTarget);
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
    $(document.body).on('click', '.viewByRating', (function(event) {
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
    $(document.body).on('click', '.cancel', (function(event) {
      event.preventDefault(); 
      console.log("I have been clicked - Cancel Button");
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
    //renderForm();
  };

  return {
    bindEventListeners:bindEventListeners,
    render:render,
    renderForm,
    renderAllElements,
    renderAllElementsExpanded,
    renderBookmarkElement,
    renderBookmarkElementExpanded,
    renderSomeElements
    // bindEventListeners:bindEventListeners,
    // render:render,
    // renderForm:renderForm,
    // renderAllElements:renderAllElements,
    // renderAllElementsExpanded:renderAllElementsExpanded,
    // renderBookmarkElement:renderBookmarkElement,
    // renderBookmarkElementExpanded:renderBookmarkElementExpanded,
    // renderSomeElements:renderSomeElements,
  };

})();