export const filterLink = (filter, text, activeFilter) => {
  const li = document.createElement("li");

  const liLink = document.createElement("a");
  liLink.href = filter;
  if (activeFilter === filter) {
    liLink.classList.add("selected");
  }
  liLink.innerHTML = text;

  li.appendChild(liLink);

  return li;
};
