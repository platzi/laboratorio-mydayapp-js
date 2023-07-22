
function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

export {
  setStorage,
  getStorage,
  removeItem
}
