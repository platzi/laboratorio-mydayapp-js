import { clearCompletedButton, todoListContainer } from "./domElements";
import { routes } from "./routes";

const errorMessage = document.createElement('h2');
errorMessage.style.textAlign = 'center';

export const loadRoute = () => {
  const currentRoute = window.location.hash;
  const URL = currentRoute === '' ? '#/' : currentRoute;
  loadPage(URL);
}

export const loadPage = url => {
  setTimeout(() => {
    const currentUrl = routes.find(item => item.path === url);
    try {
      currentUrl.template();
    } catch {
      clearCompletedButton.classList.add('hidden');
      errorMessage.textContent = `Sorry, but "${window.location.href}" isn't a valid URL. Please check and try again or use any of the filters below.`
      todoListContainer.append(errorMessage);
      throw new Error(`Sorry, but ${window.location.href} isn't a valid URL. Please check that the hash is either #/, #/pending or #/completed`);
    }
  }, 0);
}

loadRoute();
window.onpopstate = loadRoute;
