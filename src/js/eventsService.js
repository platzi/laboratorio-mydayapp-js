const eventsService = (store) => {
  const new_input = document.querySelector(".new-todo");
  new_input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      const title = e.target.value.trim();
      if (title.length == 0) {
        window.alert("the text must be at least 1 character long");
        return;
      } else {
        store.addItem(title);
        e.target.value = "";
      }
    }
  });
};

export default eventsService;
