
const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
        color: getRandomLightColor() 
    };

    todos.unshift(item);

    const { item_el, input_el, remove_btn_el } = createTodoElements(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id !== item.id);
        item_el.remove();
        save();
    });

    input_el.addEventListener("input", () => {
        item.text = input_el.value;
        save();
    });

    input_el.addEventListener("blur", () => {
        input_el.setAttribute("disabled", "");
    });

    input_el.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            item.text = input_el.value;
            save();
            input_el.setAttribute("disabled", "");
        }
    });
}

function createTodoElements(item) {
    const item_el = document.createElement("div");
    item_el.classList.add("items");

    item_el.style.backgroundColor = item.color;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_el.classList.add("complete");
    }

    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");

    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-icons");
    edit_btn_el.innerText = "edit";

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-icons", "remove-btn");
    remove_btn_el.innerText = "delete_forever";

    actions_el.append(edit_btn_el);
    actions_el.append(remove_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(actions_el);

    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_el.classList.add("complete");
        } else {
            item_el.classList.remove("complete");
        }

        save();
    });

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id !== item.id);
        item_el.remove();
        save();
    });

    return { item_el, input_el, remove_btn_el };
}

function DisplayTodos() {
    Load();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { item_el } = createTodoElements(item);

        list_el.append(item_el);
    }
}

function save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos", save);
}

function Load() {
    const data = localStorage.getItem("my_todos");

    if (data) {
        todos = JSON.parse(data);
    }
}

function getRandomLightColor() {
    const r = Math.floor(Math.random() * 100) + 150;
    const g = Math.floor(Math.random() * 100) + 150;
    const b = Math.floor(Math.random() * 100) + 150;
    const a = 0.7;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

DisplayTodos();