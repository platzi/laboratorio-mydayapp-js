export const todoTemplateCreator = (TODO) => {
  const template = 
  `<li data-todo-id=${TODO.id}>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>${TODO.text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${TODO.text}" />
  </li>`

  return template;
}