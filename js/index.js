var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var bookmarkList = [];
if (localStorage.getItem("bookmarkContainer") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
  displayData();
}
function addBookmark() {
  if (validName() == true && validUrl() == true) {
    var bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
    displayData();
    clearForm();
  }
  else{
    alert(
      `Site name must contain at least 3 characters
      AND
      Site URL must be a valid one`
    );
  }
}
function clearForm() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-valid");
}
function displayData() {
  var data = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    data += `<tr>
        <td> ${i + 1} </td>
        <td> ${bookmarkList[i].name} </td>
        <td>
            <button onclick="urlVist( ${i} )" class="btn btn-success">
                <i class="fa-regular fa-eye"></i>
                Visit
            </button>
        </td>
        <td>
            <button onclick="deleteItem( ${i} )" class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </td>
    </tr>`;
  }
  document.getElementById("tableData").innerHTML = data;
}
function deleteItem(indexItem) {
  bookmarkList.splice(indexItem, 1);
  localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
  displayData();
}
function urlVist(i) {
  var vist = bookmarkList[i].url;
  window.open(vist);
}
function validName() {
  var text = bookmarkNameInput.value;
  var regex = /^[a-zA-Z0-9]{3,}$/;
  if (regex.test(text) == true) {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
  
    return false;
  }
}
function validUrl() {
  var text = bookmarkUrlInput.value;
  var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  if (regex.test(text) == true) {
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
   
    return false;
  }
}
