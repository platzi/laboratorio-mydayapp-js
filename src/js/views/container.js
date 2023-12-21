import { main } from "./containerComponents/main";
import { footer } from "./containerComponents/footer";
import * as controller from "../controller";

const ID = "container";

export const renderContent = (toDosCollection) => {
  const container = document.getElementById(ID);
  if (!container) return;

  container.innerHTML = "";

  const mainSection = main(toDosCollection);
  if (mainSection) container.appendChild(mainSection);

  const footerSection = footer(toDosCollection, controller);
  if (footerSection) container.appendChild(footerSection);
};
