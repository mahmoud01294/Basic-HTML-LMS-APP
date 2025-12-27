let courses = [];
let currentIndex = -1;
var header = document.getElementById("Header");

var backToTop = document.getElementById("backToTop");

window.onscroll = function () {
  if (scrollY > 100) {
    header.classList.add("headerFixed");
    backToTop.classList.remove("hide");
  } else {
    header.classList.remove("headerFixed");
    backToTop.classList.add("hide");
  }
};

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* CRUD System */
let submitBtn = document.getElementById("submitBtn");

let courseName = document.getElementById("courseName");
let courseCategory = document.getElementById("courseCategory");
let courseLevel = document.getElementById("courseLevel");
let lectuersNumber = document.getElementById("lectuersNumber");
let coursePrice = document.getElementById("coursePrice");
let courseImage = document.getElementById("courseImage");
let courseMedia = document.getElementById("courseMedia");

if (localStorage.getItem("ourcourses") != null) {
  courses = JSON.parse(localStorage.getItem("ourcourses"));
  displayCourses();
} else {
  courses = [];
}

function addCourse() {
  let course = {
    name: courseName.value,
    category: courseCategory.value,
    level: courseLevel.value,
    numbers: lectuersNumber.value,
    price: coursePrice.value,
    img: courseImage.files.length
      ? `img/${courseImage.files[0].name}`
      : "img/default.jpg",
    media: courseMedia.value,
  };

  if (currentIndex === -1) {
    courses.push(course); // ADD
  } else {
    courses[currentIndex] = course; // UPDATE
    currentIndex = -1;
    submitBtn.innerText = "Add Course";
  }

  localStorage.setItem("ourcourses", JSON.stringify(courses));
  displayCourses();
  emptyInp();
}

function setFormForUpdate(index) {
  currentIndex = index;

  courseName.value = courses[index].name;
  courseCategory.value = courses[index].category;
  courseLevel.value = courses[index].level;
  lectuersNumber.value = courses[index].numbers;
  coursePrice.value = courses[index].price;

  submitBtn.innerText = "Update Course";
}

function displayCourses() {
  const cartoona = courses
    .map((course, index) =>
      `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${course.img.trim()}" width="30" height="100"/></td>
          <td>${course.name.trim()}</td>
          <td>${course.category.trim()}</td>
          <td>${course.level.trim()}</td>
          <td>${course.price}</td>
          <td>
            <button class="btn btn-danger action-btn" onclick="deleteRow(${index})">Delete</button>
            <button class="btn btn-warning action-btn" onclick="setFormForUpdate(${index})">update</button>
            
          </td>
        </tr>
    `.trim()
    )
    .join("");

  document.getElementById("tbody").innerHTML = cartoona;
}

function deleteAll() {
  courses.splice(0);
  localStorage.setItem("ourcourses", JSON.stringify(courses));
  displayCourses();
}

function deleteRow(i) {
  courses.splice(i, 1);
  localStorage.setItem("ourcourses", JSON.stringify(courses));
  displayCourses();
}

/*refresh inputs after add*/

function emptyInp() {
  courseName.value = "";
  courseCategory.value = "";
  courseLevel.value = "";
  lectuersNumber.value = "";
  coursePrice.value = "";
  courseImage.value = "";
  courseMedia.value = "";
}
