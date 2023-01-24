import { todoListContainer } from "./domElements";

const errorMessage = document.createElement('h2');
errorMessage.style.textAlign = 'center';

export class Router {
  constructor(route) {
    this.route = route;
    this.loadRoute();
  }

  loadRoute() {
    const currentRoute = window.location.hash;
    const URL = currentRoute === '' ? '#/' : currentRoute;
    this.loadPage(URL);
  }

  loadPage(url) {
    const currentUrl = this.route.find(item => item.path === url);
    try {
      currentUrl.template();
    } catch {
      errorMessage.textContent = `Sorry, but "${window.location.href}" isn't a valid URL. Please check and try again`
      todoListContainer.append(errorMessage);
      throw new Error(`Sorry, but ${window.location.href} isn't a valid URL. Please check that the hash is either #/, #/pending or #/completed`);
    }
    window.history.pushState({path: currentUrl.path}, 'loaded', currentUrl.path);
  }
}