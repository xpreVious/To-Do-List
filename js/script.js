let todoInput; // PLace where user can enter content
let errorInfo; // Info about empty todo list
let addBtn; // Add button
let ulList; // <ul> list
let newTodo; // New task

let popup; // popup
let popupInfo; // text in popup
let todoToEdit; //edited Todo
let popupInput; // input in popup
let popupAddBtn; // ADD button in popup
let popupCloseBtn; // CANCEL button in popup

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = popup.querySelector(".popup-info");
	popupInput = popup.querySelector(".popup-input");
	popupAddBtn = popup.querySelector(".accept");
	popupCloseBtn = popup.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTask = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		ulList.append(newTodo);
		createToolsArea();
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};

const createToolsArea = () => {
	const newDiv = document.createElement("div");
	newDiv.classList.add("tools");
	newTodo.append(newDiv);

	const newPlus = document.createElement("button");
	newPlus.classList.add("complete");
	newPlus.innerHTML = '<i class="fas fa-check"></i>';

	const newEdit = document.createElement("button");
	newEdit.classList.add("edit");
	newEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
	const newMinus = document.createElement("button");
	newMinus.classList.add("delete");
	newMinus.innerHTML = '<i class="fas fa-times"></i>';

	newDiv.append(newPlus, newEdit, newMinus);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
		closePopup();
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
	popupInput.value = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Musisz podać jakąś treść!";
	}
};

const deleteTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście!";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTask();
	}
};

document.addEventListener("DOMContentLoaded", main);
