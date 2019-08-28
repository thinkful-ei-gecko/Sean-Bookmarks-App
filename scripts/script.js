'use strict';
let TOTAL = 0;


function renderInputForm () {
  $('form').on('click', '#addButton', function(event){
    event.preventDefault();  
    $('form').html(`<div class = "formInput">
        <p>Title: </p>
        <input type="text" name="title" id="title" class = "movieTitle" required />
        <p> URL: </p>
        <input type="text" name="url" id ="url" required />
        <section class = "movieRating">
            <p>Rating</p>
            <input type="radio" id="rating5" name="rating" value="5"><label for "rating5">5</label>
            <input type="radio" id="rating4" name="rating" value="4"><label for "rating5">4</label>
            <input type="radio" id="rating3" name="rating" value="3"><label for "rating5">3</label>
            <input type="radio" id="rating2" name="rating" value="2"><label for "rating5">2</label>
            <input type="radio" id="rating1" name="rating" value="1"><label for "rating5">1</label>
        </section>
        <p> Description: </p>
        <input type= "text" name = "desc" id="desc" class ="description">
        <section class = "submitArea">
            <input type= "button" class="uploadButton" value="Upload Movie">
        </section>
        </div>`);
  });
}

function renderNextAddition(){
    
}


function formSubmission (){
  $('form').on('click', '.uploadButton', function(event) {
    event.preventDefault(); 
    let formElement = $('#userChoice')[0];
    serializeJSON(formElement);
  });
  TOTAL++;
}

function serializeJSON(form) {
  const formData = new FormData (form);
  formData.forEach((val, name) => STORE[name] = val);
  console.log(JSON.stringify(STORE));
  console.log(STORE);
  return JSON.stringify(STORE);
}

function main() {
  renderInputForm();
  formSubmission();

}

$(main);