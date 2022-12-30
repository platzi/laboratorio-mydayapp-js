import { inputNewTodo } from "./nodes";
import { addTodoList, taskListArray, clearTaskCompleted } from "./addTodoList";
import { main, footer, clearCompleted } from "./nodes";

export const inputValue = () => {    
    const text = inputNewTodo.value.trim();
    if (text !== "") {
        clearInput();        
        addTodoList(text);
    } else {
        clearInput();
    };
};

function clearInput() {
    inputNewTodo.value = "";
};

inputNewTodo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        inputValue(inputNewTodo);
    };
});

export function verifyTaskLIstArray() {
    if (taskListArray.length === 0) {
        main.classList.add('hidden');
        footer.classList.add('hidden');
    } else {
        main.classList.remove('hidden');
        footer.classList.remove('hidden');
    };
};

clearCompleted.addEventListener("click", clearTaskCompleted)