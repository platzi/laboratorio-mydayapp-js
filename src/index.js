import "./css/base.css";

import { sayHello } from "./js/utils";

function updateUI() {
    let todosLength = document.getElementsByClassName('todo-list')[0].childElementCount
    let main = document.getElementsByClassName('main')[0]
    let footer = document.getElementsByClassName('footer')[0]

    if (todosLength === 0) {
        main.style.display = 'none'
        footer.style.display = 'none'
    }
    else {
        main.style.display = 'block'
        footer.style.display = 'block'
    }
}
updateUI()
console.log(sayHello("Hello"));
