export const sayHello = (text) => {
  return text;
};

export const showSections = () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".footer").classList.remove("hidden");
}

export const hideSections = () => {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".footer").classList.add("hidden");
}