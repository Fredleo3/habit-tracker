const form = document.getElementById("habit-form");
const inputHabit = document.getElementById("habit-form-input");
const habitList = document.getElementById("habit-list-container");

document.addEventListener("DOMContentLoaded", loadHabits);

function loadHabits() {
  const habits = gethabits();
  console.log(habits);
  for (let i = 0; i <= habits.length - 1; i++) {
    renderHabits(habits[i].text, habits[i].done);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = inputHabit.value.trim(); // Trim elimina los espacios al inicio y al final del texto

  if (input !== "") {
    renderHabits(input, false);
    inputClean();
    newHabit(input, false);
  }
});

function renderHabits(text, done) {
  let completed = "";
  let icon = "radio_button_unchecked";
  let classButton = "habit-list__item-check";
  if (done) {
    completed = "done";
    icon = "radio_button_checked";
    classButton = "habit-list__item-checked";
  }
  habitList.innerHTML += `
        <li class="habit-list__item">
            <button class="${classButton} ">
              <i class="material-symbols-outlined  ${completed}">${icon}</i>
            </button>         
            <button class="habit-list__item-text">${text}</button>
            <button class="habit-list__item-delete">
              <i class="material-symbols-outlined">delete</i>
            </button>
          </li>
          `;
}

function inputClean() {
  inputHabit.value = "";
  inputHabit.focus();
}

habitList.addEventListener("click", (e) => {
  e.preventDefault();

  const action = e.target;

  if (action.closest(".habit-list__item-delete")) {
    habitDeleter(action);
  } else if (
    action.closest(".habit-list__item-check") ||
    action.closest(".habit-list__item-checked") ||
    action.closest(".habit-list__item-text")
  ) {
    habitChecker(action);
  }
});

function habitChecker(action) {
  if (action.innerHTML === "radio_button_unchecked") {
    action.innerHTML = "radio_button_checked";
    action.classList.add("done");
    action.parentNode.classList.remove("habit-list__item-check");
    action.parentNode.classList.add("habit-list__item-checked");
    saveChecker(action, true);
  } else if (action.innerHTML === "radio_button_checked") {
    action.innerHTML = "radio_button_unchecked";
    action.classList.remove("done");
    action.parentNode.classList.remove("habit-list__item-checked");
    action.parentNode.classList.add("habit-list__item-check");
    saveChecker(action, false);
  } else if (action.childNodes[1].innerHTML === "radio_button_unchecked") {
    action.childNodes[1].innerHTML = "radio_button_checked";
    action.childNodes[1].classList.add("done");
    action.classList.remove("habit-list__item-check");
    action.classList.add("habit-list__item-checked");
    saveChecker(action, true);
  } else {
    action.childNodes[1].innerHTML = "radio_button_unchecked";
    action.childNodes[1].classList.remove("done");
    action.classList.remove("habit-list__item-checked");
    action.classList.add("habit-list__item-check");
    saveChecker(action, false);
  }
}

function saveChecker(action, done) {
  const index = getHabitIndex(action);
  let habits = gethabits();
  habits[index].done = done;
  saveHabits(habits);
}

function getHabitIndex(action) {
  const item = action.closest("li");
  const parent = item.parentElement;
  return Array.from(parent.children).indexOf(item);
}

function habitDeleter(action) {
  index = getHabitIndex(action);

  let habits = gethabits();
  habits.splice(index, 1);
  saveHabits(habits);
  action.closest("li").remove();
}

function newHabit(input, done) {
  const newHabit = { text: input, done: done };
  let habits = gethabits();
  habits.push(newHabit);
  saveHabits(habits);
}

function saveHabits(habits) {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function gethabits() {
  return JSON.parse(localStorage.getItem("habits")) || [];
}
