export const todoTemplateCreator = (TODO) => {
  const template = 
  `<li data-todo-id=${TODO.id} class="${TODO.completed ? 'completed' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${TODO.completed ? 'checked' : ''}/>
      <label>${TODO.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${TODO.title}" />
  </li>`

  return template;
}

export const todoCounterTemplateCreator = (totalTodos) => {
  const template = `<strong>${totalTodos}</strong> ${totalTodos == 1 ? "item" : 'items'} left`;
  return template;
}