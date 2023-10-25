"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const Calbmibtn = document.getElementById("cal-bmi-btn");

let tableBodyEl = document.getElementById("tbody");

const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breedArr") || [];
const formEl = document.getElementById("container-form");
saveToStorage("petArr", petArr);

// Sự kiện chọn vào typeInput
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter((breeds) => breeds.type === "Dog");
  const breedCats = breedArr.filter((breeds) => breeds.type === "Cat");
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breeds) {
      const option = document.createElement("option");
      option.innerHTML = `${breeds.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breeds) {
      const option = document.createElement("option");
      option.innerHTML = `${breeds.breed}`;
      breedInput.appendChild(option);
    });
  }
}
typeInput.addEventListener("click", renderBreed);

// Thêm dữ liệu nhập vào
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
				<td>${petArr[i].name}</td>
				<td>${petArr[i].age}</td>
				<td>${petArr[i].type}</td>
				<td>${petArr[i].weight} kg</td>
				<td>${petArr[i].length} cm</td>
				<td>${petArr[i].breed}</td>
				<td>
					<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
				</td>
				<td>
          <i class="bi ${
            petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          <i class="bi ${
            petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          <i class="bi ${
            petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
				<td>
          ${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}
        </td>
				<td>
	        <button 
            class="btn btn-danger" 
            onclick="editPet('${petArr[i].id}')">Edit
          </button>
        </td>
      `;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

//Hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id) {
  //Hien thi edit form
  formEl.classList.remove("hide");

  //tìm dữ liệu của thú cưng cần edit
  const pet = petArr.find((petItem) => petItem.id === id);

  //Đổ thông tin của thú cưng lên form nhập
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  //hiện thị giống thú cưng
  renderBreed();
  breedInput.value = `${pet.breed}`;
}

////////////////////////////////////////

///////////////////////////////////////
//sự kiến ấn vào nút submit
submitBtn.addEventListener("click", function () {
  //1. Lấy dữ liệu từ form input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    //date: new Date(),
  };

  //2. Kiểm tra dữ liệu
  const isValidate = validate(data);
  //console.log(isValidate);
  if (isValidate) {
    //petArr.push(data);
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    //cập nhật lại dữ liệu của thú cưng
    petArr[index] = data;

    //6. Lưu dữ liệu xuống local storage
    saveToStorage("petArr", petArr);
    //ẩn form
    formEl.classList.add("hide");
    //hiển thị ds thú cưng
    renderTableData(petArr);
  }
  // Dữ liệu đúng thực hiện 3,4,5
  // Dữ liệu sai hiện thông báo
});
//////////////////////////////////
// Kiểm tra dữ liệu đầu vào
function validate(data) {
  // Đảm bảo không có trường nào bị thiếu dữ lệu
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Vui lòng nhập trường ID!");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Vui lòng nhập trường name!");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Vui lòng nhập trường age!");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Vui lòng nhập trường weight!");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Vui lòng nhập trường length!");
    isValidate = false;
  }

  // Kiểm tra ID có phải duy nhất hay không?
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
  }
  // Kiểm tra tuổi từ 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra weight từ 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra length  từ 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  // Kiểm tra chọn giá trị type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  // Kiểm tra chọn giá trị breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}
