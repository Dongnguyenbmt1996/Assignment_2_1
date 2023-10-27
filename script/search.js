"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
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
    `;

		tableBodyEl.appendChild(row);
	}
}
renderTableData(petArr);

////////////////////////
///Bắt sự kiện nhấn nút find
findBtn.addEventListener("click", function () {
	let petArrFind = petArr;
	if (idInput.value) {
		petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
	}
	if (nameInput.value) {
		petArrFind = petArrFind.filter((pet) => pet.id.includes(nameInput.value));
	}
	if (typeInput.value !== "Select Type") {
		petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
	}
	if (breedInput.value !== "Select Breed") {
		petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
	}
	// Các hộp check -> kiểm tra giá trị bằng ".checked", NOT ".value"
	if (vaccinatedInput.checked === true) {
		petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
	}
	if (dewormedInput.checked === true) {
		petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
	}
	if (sterilizedInput.checked === true) {
		petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
	}
	renderTableData(petArrFind);
});
//hiển thị các loại giống breed
renderBreed();
//hàm hiển thị tất cả các giống breed
function renderBreed() {
	breedArr.forEach(function (breedItem) {
		const option = document.createElement("option");
		option.innerHTML = `${breedItem.breed}`;
		breedInput.appendChild(option);
	});
}
