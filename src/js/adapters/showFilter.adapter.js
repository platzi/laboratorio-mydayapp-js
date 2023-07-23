const filters = document.getElementsByClassName("filters")[0];

function showFilter() {
  const hash = window.location.href;
  for (const filter of filters.children) {
    const anchor = filter.getElementsByTagName("a")[0];
    if (anchor.href === hash) {
      anchor.classList.add("selected");
      continue;
    }
    anchor.classList.remove("selected");
  }
}

export default showFilter;
