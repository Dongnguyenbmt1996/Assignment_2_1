"use strict";
const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");
// bắt sự kiện nhấn vào nút export
btnExport.addEventListener("click", function () {
	const isExport = confirm("Bạn xác nhận chắc chắn Export?");
	if (isExport) {
		saveStaticDataToFile();
	}
});
///////////////////////
//Hàm lưu dữ liệu xuống file
function saveStaticDataToFile() {
	//tạo dữ liệu để lưu xuống
	const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
		type: "application/json",
	});
	//lưu file
	saveAs(blob, "petData.json");
}
//////////////////////////
//bắt sự kiện nút Import
btnImport.addEventListener("click", function () {
	//Kiểm tra người dùng đã chọn tập tin chưa?
	if (!fileInput.value) {
		alert("Vui lòng chọn file muốn import!");
	} else {
		//xác nhận import
		const isImport = confirm("Bạn có chắc chắn import file này?");
		if (isImport) {
			const file = fileInput.file[0];
			const reader = new FileReader();
			//sự kiện load dữ liệu file lên
			reader.addEventListener(
				"load",
				function () {
					//kiểm tra cấu trúc file
					const isValidateFile = checkFile(JSON.parse(reader.result));
					if (isValidateFile) {
						//lưu dữ liệu xuống localstorage
						saveToStorage("petArr", JSON.parse(reader.result));
						//thông báo import thành công
						alert("Import thành công!");
					}
				},
				false
			);
			//đọc file
			if (file) {
				reader.readAsText(file);
			}
			//reset file input
			fileInput.value = "";
		}
	}
});
