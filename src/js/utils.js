export const RegExps = {
  redundantSpaces: new RegExp(/\s\s+/, "g"),
};

export const getCurrentHash = () => {
  const { hash } = window.location;
  return hash.split("#/")[1];
};
