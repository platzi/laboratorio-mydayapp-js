export const mainFooterDisplayValidator = () => {
  const totalList = document.querySelector(".todo-list");

  if (!totalList.innerText.length) {
    const mainTarget = document.querySelector(".main");
    mainTarget.style.display = "none";

    const footerTarget = document.querySelector(".footer");
    footerTarget.style.display = "none";
  }
};
