import { main } from "./containerComponents/main";
import { footer } from "./containerComponents/footer";
import * as controller from "../controller";

const ID = "container";

export const renderContent = (toDos) => {
  const container = document.getElementById(ID);
  if (!container) return;

  container.innerHTML = "";

  const mainSection = main(toDos);
  if (mainSection) container.appendChild(mainSection);

  const footerSection = footer(toDos, controller);
  if (footerSection) container.appendChild(footerSection);
};
