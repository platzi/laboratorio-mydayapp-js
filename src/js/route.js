import { showTodos } from "./showTodos";

const router = () => {
  let hash = window.location.hash.substring(2);

  showTodos(hash);
};

export default router;
