// this file contains all the router logic

// imports section
import { clearCompletedButton, taskListContainer } from "./domElements";
import { routes } from "./routes";

// this new element manages an 'error message' whenever an unknown path is entered in the URL
const errorMessage = document.createElement('h2');
errorMessage.style.textAlign = 'center';

// this function will load the default 'all' path when the project is opened for the first time 
// and also load the saved URL in history when the user interacts with the forward and 
// back buttons of the browser
export const loadRoute = () => {
  const currentRoute = window.location.hash;
  const URL = currentRoute === '' ? '#/' : currentRoute;
  loadPage(URL);
}

// this function manages the page loading whenever the URL is set to any of the filter's in the
// footer, using the templates created in the routes array in routes.js, as well as managing any
// path errors
export const loadPage = url => {
  setTimeout(() => {
    const currentUrl = routes.find(item => item.path === url);
    try {
      currentUrl.template();
    } catch {
      taskListContainer.replaceChildren('');
      clearCompletedButton.classList.add('hidden');
      errorMessage.textContent = `Sorry, but "${window.location.href}" isn't a valid URL. Please check and try again or use any of the filters below.`
      taskListContainer.append(errorMessage);
      throw new Error(`Sorry, but ${window.location.href} isn't a valid URL. Please check that the hash is either #/, #/pending or #/completed`);
    }
  }, 0);
}

loadRoute();

// this will load the current route whenever the browser's history changes
window.onpopstate = loadRoute;
