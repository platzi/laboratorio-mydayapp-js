import { main, footer, newTodoInput } from './selectors';

main.classList.add('hidden');
footer.classList.add('hidden');

function changeDisplay() {
  if (newTodoInput.value.trim() !== "") {
    main.classList.remove('hidden');
    footer.classList.remove('hidden');
  }


}
export const inputEvent = newTodoInput.addEventListener('change', changeDisplay);