const form = document.getElementById("habit-form");
const inputHabit = document.getElementById("habit-form-input");
const habitList = document.getElementById("habit-list-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = inputHabit.value.trim();

  if (input !== "") {
    habitList.innerHTML += `
        <li class="habit-list__item">
            <button class="habit-list__item-check">
              <i class="material-symbols-outlined">radio_button_unchecked</i>
            </button>         
            <button class="habit-list__item-text">${input}</button>
            <button class="habit-list__item-delete">
              <i class="material-symbols-outlined">delete</i>
            </button>
          </li>
          `;

    inputClean();
  }
});

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
  } else if (action.innerHTML === "radio_button_checked") {
    action.innerHTML = "radio_button_unchecked";
    action.classList.remove("done");
    action.parentNode.classList.remove("habit-list__item-checked");
    action.parentNode.classList.add("habit-list__item-check");
  } else if (action.childNodes[1].innerHTML === "radio_button_unchecked") {
    action.childNodes[1].innerHTML = "radio_button_checked";
    action.childNodes[1].classList.add("done");
    action.classList.remove("habit-list__item-check");
    action.classList.add("habit-list__item-checked");
  } else {
    action.childNodes[1].innerHTML = "radio_button_unchecked";
    action.childNodes[1].classList.remove("done");
    action.classList.remove("habit-list__item-checked");
    action.classList.add("habit-list__item-check");
  }
}

function habitDeleter(action) {
  action.closest("li").remove();
}
