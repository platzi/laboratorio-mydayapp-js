

function Task({ id, title, state }) {
  const taskItem = document.createElement('li');
  taskItem.className = 'pending';

  const view = document.createElement('div');
  view.className = 'view';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = false;
  checkbox.className = 'toggle';
  checkbox.addEventListener('change', () => {
    const event = new CustomEvent('stateChanged', {
      detail: {
        id,
        state: checkbox.checked ? 'completed' : 'pending'
      }
    })
    document.dispatchEvent(event);
  })

  const label = document.createElement('label');
  label.textContent = title;

  const destroy = document.createElement('button');
  destroy.className = 'destroy';
  destroy.addEventListener('click', () => {
    const event = new CustomEvent('deleteTask', {
      detail: {
        id
      }
    })
    document.dispatchEvent(event);
  })

  view.appendChild(checkbox);
  view.appendChild(label);
  view.appendChild(destroy);

  const edit = document.createElement('input');
  edit.value = title;
  edit.className = 'edit';
  edit.addEventListener('dblclick', () => {
    const event = new CustomEvent('editTask', {
      detail: {
        id,
        newTitle: edit.value
      }
    })
    document.dispatchEvent(event);
  });

  taskItem.appendChild(view);
  taskItem.appendChild(edit);
  return taskItem;
}

export default Task;

