export const filters = document.querySelector(".filters");

export const getTaskFilterd = () => {
  const { hash } = window.location;
  const all = filters.children[0].lastElementChild.classList;
  const pending = filters.children[1].lastElementChild.classList;
  const completed = filters.children[2].lastElementChild.classList;

  switch (hash) {
    case "":
    case "#/":
    case "#/all":
      all.add("selected");
      pending.remove("selected");
      completed.remove("selected");
      break;
    case "#/pending":
      all.remove("selected");
      pending.add("selected");
      completed.remove("selected");
      break;
    case "#/completed":
      all.remove("selected");
      pending.remove("selected");
      completed.add("selected");
      break;
    default:
      all.add("selected");
      pending.remove("selected");
      completed.remove("selected");
  }
};
