const getHash = () =>
  location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "all";

export default getHash;
